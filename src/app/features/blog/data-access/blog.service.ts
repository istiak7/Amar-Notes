import { Injectable, signal, computed } from '@angular/core';

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  readTime: number;
  tags: string[];
  coverColor: string;
};

const POSTS: BlogPost[] = [
  {
    id: 'process-vs-thread',
    title: 'Process vs Thread',
    excerpt: 'Two core abstractions power every operating system — processes and threads. Understanding the difference is fundamental to writing efficient, concurrent software.',
    content: `
      <p>An operating system runs many programs simultaneously. Understanding how it manages resources is fundamental to writing efficient, concurrent software. Two core abstractions power this: <strong>processes</strong> and <strong>threads</strong>.</p>

      <h2>What is a Process?</h2>
      <p>A process is an independent program in execution. Each process has its own isolated memory space — its own heap, stack, code, and data segments. The OS treats processes as completely separate entities; one crashing process cannot take down others.</p>
      <p>When you open a browser, each tab may run in its own process. This isolation means a rogue tab cannot corrupt another tab's memory — a deliberate design choice for stability and security.</p>

      <h2>What is a Thread?</h2>
      <p>A thread is the smallest unit of execution <em>within</em> a process. Multiple threads share the same memory space and resources of their parent process. Think of a process as a factory and threads as workers inside it — they all share the same tools and workspace, which makes communication fast but coordination tricky.</p>

      <h2>Key Differences</h2>
      <table>
        <thead>
          <tr><th>Aspect</th><th>Process</th><th>Thread</th></tr>
        </thead>
        <tbody>
          <tr><td>Memory</td><td>Isolated address space</td><td>Shared memory</td></tr>
          <tr><td>Creation cost</td><td>High (OS fork syscall)</td><td>Low</td></tr>
          <tr><td>Communication</td><td>IPC — pipes, sockets, shared memory</td><td>Direct shared variables</td></tr>
          <tr><td>Isolation</td><td>Strong — crash is contained</td><td>Weak — one thread can crash all</td></tr>
          <tr><td>Context switch</td><td>Expensive</td><td>Cheap</td></tr>
        </tbody>
      </table>

      <h2>When to Use Which?</h2>
      <p>Use <strong>processes</strong> when you need strong isolation — browser sandboxing, microservices, or any scenario where a crash should not cascade to other components. The overhead of process creation is worth the fault tolerance.</p>
      <p>Use <strong>threads</strong> when tasks share a lot of data and low overhead matters — a web server handling concurrent requests, a game engine running physics and rendering in parallel, or any CPU-bound computation that benefits from parallelism within a single program.</p>

      <h2>A Quick Example (Node.js)</h2>
      <pre><code>// Worker Threads — same process, separate thread
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // Main thread spawns a worker
  const worker = new Worker(__filename);
  worker.on('message', (result) => {
    console.log('Worker result:', result);
  });
  worker.postMessage('start');
} else {
  // Worker thread — shares the process, runs in parallel
  parentPort.on('message', () => {
    const result = heavyComputation(); // won't block the main thread
    parentPort.postMessage(result);
  });
}

// Processes — fully isolated via child_process
const { fork } = require('child_process');
const child = fork('./worker.js'); // new OS process
child.on('message', (msg) => console.log('From process:', msg));
child.send({ task: 'compute' });</code></pre>

      <h2>The Modern Hybrid Approach</h2>
      <p>Real-world systems rarely commit to just one model. <strong>Node.js</strong> uses a single-threaded event loop but spawns worker threads for CPU-heavy tasks. <strong>Chromium</strong> uses a multi-process architecture where each renderer process is internally multi-threaded. <strong>PostgreSQL</strong> spawns a new process per connection, while <strong>Nginx</strong> uses a small number of worker processes each running an event loop.</p>
      <p>The pattern is consistent: processes for isolation boundaries, threads for parallelism within those boundaries.</p>

      <h2>Race Conditions — The Thread Trap</h2>
      <p>Shared memory in threads is a double-edged sword. When two threads read and write the same variable without synchronization, you get a <strong>race condition</strong> — the program's result depends on which thread runs first, leading to unpredictable bugs that are notoriously hard to reproduce.</p>
      <pre><code>// Race condition example (pseudocode)
let counter = 0;

// Thread A and Thread B both run simultaneously
// Thread A: reads counter (0), Thread B: reads counter (0)
// Thread A: writes counter + 1 = 1
// Thread B: writes counter + 1 = 1  ← should be 2!

// Fix: use a mutex / atomic operation
mutex.lock();
counter++;
mutex.unlock();</code></pre>

      <h2>Conclusion</h2>
      <p>The choice between processes and threads comes down to <strong>isolation vs efficiency</strong>. Processes trade memory overhead for safety and independence. Threads trade isolation for speed and easy data sharing. Understanding this tradeoff is foundational to designing systems that are both performant and resilient — and to debugging the subtle concurrency bugs that arise when you get it wrong.</p>
    `,
    author: 'Istiak Ovi',
    publishedAt: new Date('2026-05-14'),
    readTime: 6,
    tags: ['OS', 'Concurrency', 'Systems'],
    coverColor: '#6366f1'
  },
  {
    id: 'signals-in-angular',
    title: 'Signals in Angular — Reactive State Made Simple',
    excerpt: 'Angular Signals replace RxJS BehaviorSubject for most state management needs, delivering fine-grained reactivity with zero boilerplate. Here\'s how to think in signals.',
    content: `
      <p>Angular 16 introduced Signals as a new reactive primitive, and by Angular 21 they are the recommended way to manage state. Signals bring fine-grained change detection without the complexity of RxJS for the majority of use cases.</p>

      <h2>What is a Signal?</h2>
      <p>A signal is a wrapper around a value that notifies consumers when that value changes. It is synchronous, always has a current value, and Angular's change detection natively understands it — meaning the framework only re-renders exactly the components that depend on a changed signal.</p>

      <h2>Core API</h2>
      <pre><code>import { signal, computed, effect } from '@angular/core';

// Writable signal
const count = signal(0);

// Read the value (always call it like a function)
console.log(count()); // 0

// Update
count.set(5);
count.update(v => v + 1);

// Derived value — recomputes only when count changes
const doubled = computed(() => count() * 2);

// Side-effect — runs when dependencies change
effect(() => {
  console.log('Count is now', count());
});</code></pre>

      <h2>Signals vs BehaviorSubject</h2>
      <table>
        <thead>
          <tr><th>Feature</th><th>Signal</th><th>BehaviorSubject</th></tr>
        </thead>
        <tbody>
          <tr><td>Read value</td><td>count()</td><td>subject.value</td></tr>
          <tr><td>Update</td><td>count.set(n)</td><td>subject.next(n)</td></tr>
          <tr><td>Derived state</td><td>computed()</td><td>pipe(map())</td></tr>
          <tr><td>Template binding</td><td>Native — no async pipe</td><td>Needs | async</td></tr>
          <tr><td>Change detection</td><td>Fine-grained</td><td>Zone-based (default)</td></tr>
        </tbody>
      </table>

      <h2>Conclusion</h2>
      <p>Signals make reactive state management accessible. For local component state, shared service state, and derived computations — signals are the right tool. Reserve RxJS for complex async pipelines, HTTP streaming, or debounced user input where operators like <code>switchMap</code>, <code>debounceTime</code>, and <code>combineLatest</code> genuinely earn their place.</p>
    `,
    author: 'Istiak Ovi',
    publishedAt: new Date('2026-05-10'),
    readTime: 4,
    tags: ['Angular', 'Signals', 'TypeScript'],
    coverColor: '#ec4899'
  }
];

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly _posts = signal<BlogPost[]>(POSTS);

  readonly posts = this._posts.asReadonly();
  readonly count = computed(() => this._posts().length);

  getPost(id: string): BlogPost | undefined {
    return this._posts().find(p => p.id === id);
  }
}
