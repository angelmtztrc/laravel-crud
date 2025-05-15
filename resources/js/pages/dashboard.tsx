import CreateTaskForm from '@/components/create-task-form';
import EditTaskForm from '@/components/edit-task-form';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Task, type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CircleCheckBig, FrownIcon, SmileIcon, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type PageProps = {
    tasks: Task[];
    flash: {
        message?: string;
    };
};

export default function Dashboard() {
    const {
        props: { tasks = [], flash },
    } = usePage<PageProps>();
    const [isCompleting, setIsCompleting] = useState(false);
    const { processing: destroying, delete: destroy } = useForm();

    const handleComplete = (id: number) => {
        setIsCompleting(true);
        router.put(
            route('tasks.update', id),
            {
                completed: 1,
            },
            {
                onSuccess: () => {
                    setIsCompleting(false);
                },
            },
        );
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this task?')) {
            destroy(route('tasks.destroy', id));
        }
    };

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid h-full grid-cols-2 gap-8 p-4">
                <section>
                    <div className="mb-4 flex justify-between">
                        <h2 className="text-xl font-semibold">Pending tasks</h2>

                        <CreateTaskForm />
                    </div>
                    <div className="rounded-xl border">
                        <Table className="">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tasks.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <SmileIcon />
                                                <p className="text-muted-foreground">No pending tasks found</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {tasks
                                    .filter((task) => !task.completed)
                                    .map((task) => (
                                        <TableRow key={task.id}>
                                            <TableCell>{task.id}</TableCell>
                                            <TableCell>{task.description}</TableCell>
                                            <TableCell>{new Date(task.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell className="space-x-2" align="center">
                                                <EditTaskForm task={task} />
                                                <Button
                                                    className="cursor-pointer"
                                                    disabled={isCompleting}
                                                    onClick={() => handleComplete(task.id)}
                                                    variant="secondary"
                                                >
                                                    <CircleCheckBig />
                                                </Button>
                                                <Button
                                                    className="cursor-pointer"
                                                    disabled={destroying}
                                                    onClick={() => handleDelete(task.id)}
                                                    variant="destructive"
                                                >
                                                    <Trash />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                </section>
                <section>
                    <h2 className="mb-6 text-xl font-semibold">Completed tasks</h2>
                    <div className="rounded-xl border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Date completed</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tasks.filter((task) => task.completed).length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <FrownIcon />
                                                <p className="text-muted-foreground">No completed tasks found</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {tasks
                                    .filter((task) => task.completed)
                                    .map((task) => (
                                        <TableRow key={task.id}>
                                            <TableCell>{task.id}</TableCell>
                                            <TableCell>{task.description}</TableCell>
                                            <TableCell>{new Date(task.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell>{new Date(task.completed_at).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
