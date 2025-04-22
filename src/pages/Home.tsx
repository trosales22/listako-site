import Layout from "components/layout/Layout";
import Card from "components/ui/Card";
import { Button, Modal, Pagination, SearchInput } from "components/ui/components";
import { useState } from "react";
import { CalendarIcon, CheckCircleIcon, MessageCircleWarning, PencilIcon, Plus, TrashIcon } from "lucide-react";
import AddTaskForm from "components/modules/task/forms/AddTaskForm";
import { useDeleteTaskMutation, useListTaskQuery } from "hooks/task";
import { debounce } from "lodash";
import { Task } from "types/task";
import { toast } from 'react-toastify';
import EditTaskForm from "components/modules/task/forms/EditTaskForm";
import { useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "stores/useModalStore";

const HomePage: React.FC = () => {
    const queryClient = useQueryClient();
    const { openCreateTask, openEditTask, openDeleteTask, setOpenCreateTask, setOpenEditTask, setOpenDeleteTask } = useModalStore();
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);

    const handleSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, 300);

    const { data: response, isLoading, isError }: any = useListTaskQuery({
        params: { q: search, page: currentPage, limit: itemsPerPage }
    });

    const tasks: Task[] = response?.data?.data || [];
    const totalItems = response?.data?.meta?.pagination?.total || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const onShowEditDialogHandler = (taskId: string) => {
        setSelectedTaskId(taskId)
        setOpenEditTask(true)
    }

    const { mutate: deleteTask, isPending: isDeleteTaskLoading } = useDeleteTaskMutation({
        onSuccess: () => {
            toast.success("Deleted task successfully.");
            queryClient.invalidateQueries({ queryKey: ['TASK_LIST'] });
            setOpenDeleteTask(false);
        },
        onError: () => {}
    });

    const onShowDeleteConfirmation = (taskId: string | null) => {
        setOpenDeleteTask(true);
        setSelectedTaskId(taskId);
    };

    const onDeleteTaskHandler = () => {
        deleteTask({
            taskId: selectedTaskId
        })
    }
    
    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Tasks</h1>
                    {tasks.length > 0 && (
                        <Button className="text-sm" variant="black" onClick={() => setOpenCreateTask(true)}>
                            <Plus className="w-4 h-4 mr-2" /> Add Task
                        </Button>
                    )}
                </div>
                
                <div className="w-full flex justify-center">
                    <SearchInput
                        onChange={handleSearchChange}
                        placeholder="Search tasks..."
                        className="sm:w-1/4"
                    />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <p className="text-gray-500">Loading tasks...</p>
                    </div>
                ) : isError ? (
                    <div className="flex justify-center items-center py-20">
                        <p className="text-red-500">Failed to load tasks. Please try again later.</p>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <p className="text-gray-500">No tasks yet.</p>
                        <Button className="text-sm" variant="black" onClick={() => setOpenCreateTask(true)}>
                            <Plus className="w-4 h-4 mr-2" /> Add Task
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {tasks.map((task, index) => (
                               <Card
                                key={index}
                                className="p-3 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 group"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-0.5">
                                        <h2 className="font-medium text-base text-gray-900">{task?.attributes?.name}</h2>
                                        <p className="text-sm text-gray-600 line-clamp-2">{task?.attributes?.description}</p>
                                        </div>
                                    
                                        <div className="flex items-center space-x-3">
                                        <PencilIcon 
                                            className="w-4 h-4 text-orange-500 hover:scale-105 cursor-pointer transition" 
                                            onClick={() => onShowEditDialogHandler(task?.id)}
                                        />
                                        <TrashIcon 
                                            className="w-4 h-4 text-red-500 hover:scale-105 cursor-pointer transition" 
                                            onClick={() => onShowDeleteConfirmation(task?.id)}
                                        />
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row sm:justify-between mt-2 text-xs text-gray-500 space-y-1 sm:space-y-0">
                                        <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-1">
                                            <CheckCircleIcon className="w-3.5 h-3.5 text-green-500" />
                                            <span>{task?.attributes?.status?.label}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <MessageCircleWarning className="w-3.5 h-3.5 text-red-500" />
                                            <span>{task?.attributes?.priority?.label}</span>
                                        </div>
                                        </div>
                                    
                                        <div className="flex items-center space-x-1 sm:justify-end">
                                        <CalendarIcon className="w-3.5 h-3.5 text-gray-400" />
                                        <span>{task?.attributes?.created_at}</span>
                                        </div>
                                    </div>
                                </Card>                                                  
                            ))}
                        </div>

                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            size="sm"
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                            setItemsPerPage={setItemsPerPage}
                        />
                    </>
                )}
            </div>

            <Modal
                id="add-task-modal"
                title="Add Task"
                closeButton
                closeOnBackdrop
                isOpen={openCreateTask}
                size="sm"
                onClose={() => setOpenCreateTask(false)}
                headerColor="blue"
            >
                {openCreateTask && (
                    <AddTaskForm onClose={() => setOpenCreateTask(false)} />
                )}
            </Modal>

            <Modal
                id="edit-task-modal"
                title="Edit Task"
                closeButton
                closeOnBackdrop
                isOpen={openEditTask}
                size="sm"
                onClose={() => setOpenEditTask(false)}
                headerColor="blue"
            >
                {openEditTask && (
                    <EditTaskForm taskId={selectedTaskId} onClose={() => setOpenEditTask(false)} />
                )}
            </Modal>

            <Modal
                id="delete-task-modal"
                title="Confirm Deletion"
                isOpen={openDeleteTask}
                onClose={() => setOpenDeleteTask(false)}
                headerColor="red"
            >
                {openDeleteTask && (
                    <>
                    <p>Are you sure you want to delete this task?</p>
                    <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="ghost" onClick={() => setOpenDeleteTask(false)}>No</Button>
                        <Button 
                            variant="danger" 
                            className="text-white" 
                            onClick={onDeleteTaskHandler}
                            disabled={isDeleteTaskLoading}
                        >{isDeleteTaskLoading ? 'Deleting..' : 'Yes'}</Button>
                    </div>
                    </>
                )}
            </Modal>
        </Layout>
    );
};

export default HomePage;
