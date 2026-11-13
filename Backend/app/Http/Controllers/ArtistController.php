<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreArtistRequest;
use App\Http\Resources\ArtistResource;
use App\Models\Artist;

class ArtistController extends Controller
{
    //Listar Todos com busca e paginação
    public function index(Request $request)
    {
        $query = Artist::query()->with('albums');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
        return ArtistResource::collection($query->paginate(15));
    }

    //criar novo artista
    public function store(StoreArtistRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('artists', 'public');
        }

        return new ArtistResource(Artist::create($data));
    }

    //ver artista com álbuns e músicas
    public function show(Artist $artist)
    {
        return new ArtistResource($artist->load('albums.songs'));
    }

    //editar artistas
    public function update(StoreArtistRequest $request, Artist $artist)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('artists', 'public');
        }

        $artist->update($data);

        return new ArtistResource($artist);
    }
  
    //Excluir artista
    public function destroy(Artist $artist)
    {
        $artist->delete();

        return response()->json(['message' => 'Artista removido com sucessp']);
    }
}
