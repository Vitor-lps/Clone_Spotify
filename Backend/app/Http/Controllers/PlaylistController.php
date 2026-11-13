<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StorePlaylistRequest;
use App\Http\Resources\PlaylistResource;
use App\Models\Playlist;

class PlaylistController extends Controller
{
    public function index(Request $request)
    {
        $playlists = $request -> user()
        ->playlists()
        ->withCount('songs')
        ->paginate(15);

        return PlaylistResource::collection($playlists);
    }

    public function store(StorePlaylistRequest $request)
    {
        $playlist = $request->user()->playlists()->create($request->validated());

        return new PlaylistResource($playlist);
    }

    public function show(Playlist $playlist)
    {
        return new PlaylistResource($playlist->load('song.album.artist'));
    }

    public function update(StorePlaylistRequest $request, Playlist $playlist)
    {
        $playlist->update($request->validated());

        return new PlaylistResource($playlist);
    }

    public function destroy(Playlist $playlist)
    {
        $playlist->delete(); //SoftDelete

        return response()->json(['message'=> 'Playlist movida para a lixeira']);
    }

    public function addSong(Request $request, Playlist $playlist) {
        $request->validate(['song_id' => ['required', 'exists:songs,id']]);
        $playlist->songs()->syncWithoutDetaching([$request->song_id]);

        return new PlaylistResource($playlist->load('song.album.artist'));
    }

    public function removerSong(Playlist $playlist, int $song) {
         $playlist->songs()->detach($song);

         return response()->json(['message'=> 'Musica Removida da playlist']);
    }
}
