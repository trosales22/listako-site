export interface TaskAttributes {
  name: string;
  description: string;
  status: {
    code: 'pending' | 'in_progress' | 'completed';
    label: string;
  };
  priority: {
    code: 'low' | 'medium' | 'high';
    label: string;
  };
  created_at: string;
  updated_at?: string;
}

export interface Task {
  id: string;
  type: string;
  attributes: TaskAttributes;
}
