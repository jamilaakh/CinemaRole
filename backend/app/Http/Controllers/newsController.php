<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Show;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;



class newsController extends Controller
{
    function getAllNews()
    {
        $news = News::with('show')->orderByDesc('created_at')->get();
        return response()->json($news, 200);
    }


    function deleteNews(int $id){
        $news = News::find($id);

        // Vérifier si l'actualité existe
        if (!$news) {
            return response()->json([
                'success' => false,
                'message' => 'News not found',
            ], 404);
        }

        // Supprimer l'actualité
        $news->delete();

        // Retourner une réponse JSON de succès
        return response()->json([
            'success' => true,
            'message' => 'News deleted successfully',
        ],200);
    }


    public function editNews(Request $request)
    {
        // Validation des entrées
        $request->validate([
            'id' => 'required|integer|exists:news,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'show_id' => 'nullable|exists:shows,id',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $id = $request->input('id');

        // Recherche de l'actualité par ID
        $news = News::find($id);
        if (!$news) {
            return response()->json(['error' => 'News not found'], 404);
        }

        // Mise à jour des champs
        $news->title = $request->input('title');
        $news->content = $request->input('content');
        $news->show_id = $request->input('show_id');

        // Gestion de l'image
        if ($request->hasFile('image')) {
            // Suppression de l'ancienne image si nécessaire
            if ($news->image) {
                Storage::delete($news->image);
            }
            // Enregistrement de la nouvelle image
            $path = $request->file('image')->store('news');
            $news->image = $path;
        }

        // Sauvegarde des modifications
        if ($news->save()) {
            return response()->json($news, 200);
        } else {
            return response()->json(['error' => 'Failed to update news'], 500);
        }
    }
    // function addNews(Request $request) {

    //     $title = $request->input('title');
    //     $content = $request->input('content');

    //     if (!$title || !$content) {
    //         return response()->json(['error'=>'title or content is empty'],500);
    //     }

    //     $news = new News();
    //     $news->title = $title;
    //     $news->content=$content;

    //     if ($request->has('show_id')) {
    //         if (Show::find($request->input('show_id'))) {
    //             $news->show_id = $request->input('show_id');
    //         }else{
    //             return response()->json(['error'=>'show does not exist '],500);
    //         }

    //     }

    //     if($news->save()){
    //         return response()->json($news,200);
    //     }

    // }



    public function addNews(Request $request)
    {
        // Validation des entrées
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'show_id' => 'nullable|exists:shows,id',
            'image' => 'nullable|file'
        ]);

        // Récupération des données
        $title = $request->input('title');
        $content = $request->input('content');
        $show_id = $request->input('show_id');

        // Création d'une nouvelle instance de News
        $news = new News([
            'title' => $title,
            'content' => $content,
            'show_id' => $show_id,
            'image' => $request->input('image')
        ]);

        // Sauvegarde dans la base de données
        if ($news->save()) {
            return response()->json($news, 200);
        } else {
            return response()->json(['error' => 'Failed to save news'], 500);
        }
    }


    function getNews($id)
    {
        $news = News::with('show')->find($id);

        if (!$news) {
            return response()->json(['error' => 'News item not found'], 404);
        }

        return response()->json($news, 200);
    }
}
