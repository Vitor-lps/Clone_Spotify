<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\SongResource;
use App\Http\Requests\StoreSongRequest;
use App\Models\Song;

use function Laravel\Prompts\search;

class SongController extends Controller
{
    public function index(Request $request)
    {
        //Traz o álbum e artista
        $query = Song::query()->with('album.artist');

        //Busca pelo nome
        if($request-> filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }
        //Paginação de 15 em 15
        return SongResource::collection($query->paginate(15));
    }

    public function store(StoreSongRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            $data['file_path'] = $request->file('file')->store('songs', 'public');
        }
        return new SongResource(Song::create($data));
    }

    public function show(Song $song)
    {
        return new SongResource($song->load('album.artist'));
    }

    public function update(StoreSongRequest $request, Song $song)
    {
        $data = $request->validated();

        if ($request->hasFile('file')) {
            $data['file_path'] = $request->file('file')->store('songs', 'public');
        }

        $song->update($data);

        return new SongResource($song);
    }

    public function destroy(Song $song)
    {
        $song->delete();

        return response()->json(['message'=> 'Musica removida']);
    }
}