import { Task } from '@/types';
import { useForm } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

type EditTaskFormProps = {
    task: Task;
};

const EditTaskForm = ({ task }: EditTaskFormProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, put, reset, processing, errors } = useForm({
        description: task.description,
    });

    useEffect(() => {
        setData('description', task.description);
    }, [task, setData]);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        put(route('tasks.update', task.id), {
            onSuccess: () => {
                reset();

                setIsOpen(false);
            },
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button className="cursor-pointer" variant="outline">
                    <Pencil />
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Update task</SheetTitle>
                    <SheetDescription>Fill the form to update a task.</SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="px-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            type="text"
                            placeholder='e.g. "Buy milk"'
                            value={data.description}
                            onChange={(e) => setData('description', e.currentTarget.value)}
                        />
                        {errors.description && <p className="text-[0.8rem] text-red-500">{errors.description}</p>}
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button className="cursor-pointer" type="submit" disabled={processing}>
                            Save changes
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default EditTaskForm;
