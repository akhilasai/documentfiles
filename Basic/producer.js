function WorkerPool(numWorkers) {
    const workers = [];
    const taskQueue = [];
  
    for (let i = 0; i < numWorkers; i += 1) {
      workers.push(Worker());
    }
  
    function supplyNewTask(worker) {
      if (taskQueue.length) {
        const task = taskQueue.pop();
        console.log(`task queue length decremented to ${taskQueue.length}`);
        worker.work(task, supplyNewTask);
      }
    }
  
    return {
      work: function(task) {
        for (const worker of workers) {
          if (worker.availableTasks()) {
            worker.work(task, supplyNewTask);
            return;
          }
        }
        
        // if couldn't find a buyer...
        taskQueue.push(task);
        console.log(`task queue length incremented to ${taskQueue.length}`);
      }
    }
  }
  
  function Worker() {
    let activeTasks = 0;
    let maxTasks = 5;
  
    return {
      availableTasks: () => maxTasks - activeTasks,
      work: function(task, callback) {
        activeTasks += 1;
        console.log(`workers active tasks incremented to ${activeTasks}`);
  
        // do some work that takes an unspecified 
        // amount of time, then callback with the 
        // result.
        setTimeout(() => {
          activeTasks -= 1;
          console.log(`workers active tasks decremented to ${activeTasks}`);
          callback(this);
        }, Math.floor(Math.random() * 100));
      },
    };
  }
  
  
  const pool = WorkerPool(3);
  for (let i = 0; i < 60; i++) {
    pool.work({ /* some work to be done */ });
  }