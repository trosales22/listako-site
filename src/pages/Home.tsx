import Layout from "components/layout/Layout";
import Card from "components/ui/Card";
import { Button, Modal, Pagination, SearchInput } from "components/ui/components";
import { useState } from "react";
import { CalendarIcon, CheckCircleIcon, MessageCircleWarning, PencilIcon, Plus, TrashIcon } from "lucide-react";
import AddTaskForm from "components/modules/task/forms/AddTaskForm";
import { useListTaskQuery } from "hooks/task";
import { debounce } from "lodash";
import { Task } from "types/task";

const HomePage: React.FC = () => {
    const [openAdd, setOpenAdd] = useState(false);
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

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Tasks</h1>
                    {tasks.length > 0 && (
                        <Button className="text-sm" variant="black" onClick={() => setOpenAdd(true)}>
                            <Plus className="w-4 h-4 mr-2" /> Add Task
                        </Button>
                    )}
                </div>
                
                <div className="w-full flex justify-center">
                    <SearchInput
                        onChange={handleSearchChange}
                        placeholder="Search tasks..."
                        className="sm:w-1/2"
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
                        <Button className="text-sm" variant="black" onClick={() => setOpenAdd(true)}>
                            <Plus className="w-4 h-4 mr-2" /> Add Task
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {tasks.map((task, index) => (
                                <Card
                                    key={index}
                                    className="p-4 space-y-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
                                >
                                    <h2 className="font-semibold text-lg text-gray-900">{task?.attributes?.name}</h2>
                                    <p className="text-sm text-gray-600">{task?.attributes?.description}</p>

                                    <div className="flex flex-col sm:flex-row sm:space-x-4 mt-2">
                                        <div className="flex items-center space-x-1">
                                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                            <span className="text-sm">{task?.attributes?.status?.label}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 mt-2 sm:mt-0">
                                            <MessageCircleWarning className="w-4 h-4 text-red-500" />
                                            <span className="text-sm">{task?.attributes?.priority?.label}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-1 text-xs text-gray-400 mt-2">
                                        <CalendarIcon className="w-4 h-4 text-gray-400" />
                                        <span>{task?.attributes?.created_at}</span>
                                    </div>

                                    <div className="ml-auto mt-4 sm:mt-0 flex items-center space-x-5">
                                        <PencilIcon color="orange" className="w-5 h-5 cursor-pointer" />
                                        <TrashIcon color="red" className="w-5 h-5 cursor-pointer" />
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
                isOpen={openAdd}
                size="sm"
                onClose={() => setOpenAdd(false)}
                headerColor="blue"
            >
                {openAdd && (
                    <AddTaskForm onClose={() => setOpenAdd(false)} />
                )}
            </Modal>
        </Layout>
    );
};

export default HomePage;
