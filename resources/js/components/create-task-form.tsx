import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

const CreateTaskForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, post, reset, processing, errors } = useForm({
        description: '',
    });

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('tasks.save'), {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button>Create</Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Create task</SheetTitle>
                    <SheetDescription>Fill the form to create a task.</SheetDescription>
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
                            Create the task
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default CreateTaskForm;
