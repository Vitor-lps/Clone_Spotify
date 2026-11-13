<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreAlbumRequest;
use App\Http\Resources\AlbumResource;
use App\Models\Album;

class AlbumController extends Controller
{
   //Listar todos com busca e paginação
    public function index(Request $request)
    {
        $query = Album::query()->with('artist');

        if($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        return AlbumResource::collection($query->paginate(15));
    }

    //Criar novo álbum
    public function store(StoreAlbumRequest $request)
    {
        $data = $request->validated();

        if($request->hasFile('cover')) {
            $data['cover'] = $request->file('cover')->store('covers', 'public');
        }

        return new AlbumResource(Album::create($data));
        
    }

    //Ver um álbum com artista e músicas
    public function show(Album $album)
    {
        return new AlbumResource($album->load(['artist', 'songs']));
    }

    //editar álbum
    public function update(StoreAlbumRequest $request, Album $album)
    {
        $data = $request->validated();

        if ($request->hasFile('cover')) {
        $data['cover'] = $request->file('cover')->store('covers', 'public');
        }
        
        $album->update($data);

        return new AlbumResource($album);
    }

    //Excluir álbum
    public function destroy(Album $album)
    {
        $album->delete();

        return response()->json(['message'=> 'Álbum removido com sucesso']);
    }
}
