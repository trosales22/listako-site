import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, TextArea, Select } from "components/ui/components";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateTaskMutation } from "hooks/task";
import { TaskFormData, taskSchema } from "schemas/taskSchema";
import { taskPriorityStatuses, taskStatuses } from "utils/taskData";

interface AddTaskFormProps {
  onClose: () => void;
}

const AddTaskForm: FC<AddTaskFormProps> = ({ onClose }) => {
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: "pending",
      priority: "low",
    },
  });

  const { mutate: createTask, isPending: isCreateTaskLoading } =
    useCreateTaskMutation({
      onSuccess: () => {
        toast.success("Created task successfully.");
        queryClient.invalidateQueries({ queryKey: ["TASK_LIST"] });

        onClose();
        reset();
      },
      onError: () => {},
    });

  const onSubmit = (data: TaskFormData) => {
    createTask(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 bg-white rounded-lg min-h-[300px] p-2"
    >
      <Input
        label="Task Name"
        type="text"
        placeholder="Enter task name"
        error={errors.name?.message}
        {...register("name")}
      />

      <TextArea
        label="Description"
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          {...register("status")}
          legend="Status"
          helperColor={errors.status ? "text-red-500" : "text-black"}
          defaultValue=""
          options={taskStatuses}
          className="w-full p-2 border border-gray-300 rounded"
        />

        <Select
          {...register("priority")}
          legend="Priority"
          helperColor={errors.priority ? "text-red-500" : "text-black"}
          defaultValue=""
          options={taskPriorityStatuses}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex justify-end mt-5">
        <Button variant="primary" type="submit" disabled={isCreateTaskLoading}>
          {isCreateTaskLoading ? "Creating..." : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default AddTaskForm;
