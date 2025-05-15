<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'tasks' => Task::where('user_id', auth()->user()->id)->get()
        ]);
    }

    public function save(Request $request)
    {
        $request->validate([
            "description" => ["required", "string"]
        ]);

        $task = $request->user()->tasks()->create([
            "description" => $request->description,
            "completed_at" => null
        ]);

        return redirect()->route('dashboard')->with('message', 'Task created successfully');
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            "description" => ["sometimes", "string"],
            "completed" => ["sometimes", "boolean"],
        ]);

        if (isset($validated["completed"]) && $validated["completed"]) {
            $validated["completed_at"] = now();
        }

        $task->update($validated);
        $task->refresh();

        return redirect()->route('dashboard')->with('message', 'Task updated successfully');
    }


    public function how(Task $task)
    {
        $task->delete();

        return redirect()->route('dashboard')->with('message', 'Task deleted successfully');
    }
}
