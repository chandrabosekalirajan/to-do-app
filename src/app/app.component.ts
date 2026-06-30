import { Component, computed, effect, signal } from '@angular/core';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: number;
}

type FilterOption = 'all' | 'active' | 'completed';
type SortOption = 'newest' | 'oldest' | 'az' | 'za';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private readonly storageKey = 'todo-signals-v1';

  // -------------------------
  // Signals
  // -------------------------

  readonly todos = signal<Todo[]>(this.loadTodos());

  readonly newTodoTitle = signal('');

  readonly searchTerm = signal('');

  readonly filter = signal<FilterOption>('all');

  readonly sortOrder = signal<SortOption>('newest');

  readonly editingTodoId = signal<number | null>(null);

  readonly editingTitle = signal('');

  // -------------------------
  // Computed Signals
  // -------------------------

  readonly visibleTodos = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const filter = this.filter();
    const order = this.sortOrder();

    return this.todos()
      .filter((todo) => {
        const matchesSearch = todo.title
          .toLowerCase()
          .includes(term);

        const matchesFilter =
          filter === 'all' ||
          (filter === 'active' && !todo.completed) ||
          (filter === 'completed' && todo.completed);

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        switch (order) {
          case 'oldest':
            return a.createdAt - b.createdAt;

          case 'az':
            return a.title.localeCompare(b.title);

          case 'za':
            return b.title.localeCompare(a.title);

          case 'newest':
          default:
            return b.createdAt - a.createdAt;
        }
      });
  });

  readonly totalCount = computed(() => this.todos().length);

  readonly completedCount = computed(() =>
    this.todos().filter(todo => todo.completed).length
  );

  readonly pendingCount = computed(() =>
    this.totalCount() - this.completedCount()
  );

  readonly completionPercent = computed(() => {
    const total = this.totalCount();

    if (total === 0) {
      return 0;
    }

    return Math.round(
      (this.completedCount() / total) * 100
    );
  });

  // -------------------------
  // Constructor
  // -------------------------

  constructor() {
    effect(() => {
      if (typeof window === 'undefined') {
        return;
      }

      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.todos())
      );
    });
  }

  // -------------------------
  // Todo Methods
  // -------------------------

  addTodo(): void {
    const title = this.newTodoTitle().trim();

    if (!title) {
      return;
    }

    const now = Date.now();

    const todo: Todo = {
      id: now,
      title,
      completed: false,
      createdAt: now
    };

    this.todos.update(current => [
      todo,
      ...current
    ]);

    this.newTodoTitle.set('');
  }

  toggleTodo(todoId: number): void {
    this.todos.update(current =>
      current.map(todo =>
        todo.id === todoId
          ? {
              ...todo,
              completed: !todo.completed
            }
          : todo
      )
    );
  }

  deleteTodo(todoId: number): void {
    this.todos.update(current =>
      current.filter(todo => todo.id !== todoId)
    );
  }

  // -------------------------
  // Edit Todo
  // -------------------------

  startEditing(todo: Todo): void {
    this.editingTodoId.set(todo.id);
    this.editingTitle.set(todo.title);
  }

  saveEditing(): void {
    const id = this.editingTodoId();
    const title = this.editingTitle().trim();

    if (id === null || !title) {
      this.cancelEditing();
      return;
    }

    this.todos.update(current =>
      current.map(todo =>
        todo.id === id
          ? {
              ...todo,
              title
            }
          : todo
      )
    );

    this.cancelEditing();
  }

  cancelEditing(): void {
    this.editingTodoId.set(null);
    this.editingTitle.set('');
  }

  // -------------------------
  // Filter & Sort
  // -------------------------

  setFilterValue(value: string): void {
    switch (value) {
      case 'active':
      case 'completed':
        this.filter.set(value);
        break;

      default:
        this.filter.set('all');
    }
  }

  setSortValue(value: string): void {
    switch (value) {
      case 'oldest':
      case 'az':
      case 'za':
        this.sortOrder.set(value);
        break;

      default:
        this.sortOrder.set('newest');
    }
  }

  // -------------------------
  // Local Storage
  // -------------------------

  private loadTodos(): Todo[] {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const data = localStorage.getItem(this.storageKey);

      if (!data) {
        return [];
      }

      const parsed = JSON.parse(data) as Partial<Todo>[];

      return parsed.map(todo => ({
        id: todo.id ?? Date.now(),
        title: todo.title ?? '',
        completed: Boolean(todo.completed),
        createdAt: todo.createdAt ?? Date.now()
      }));
    } catch {
      return [];
    }
  }
}