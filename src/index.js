import ElWatcher from './ElWatcher.js';
import ElVisible from './ElVisible.js';

const nodeWatcher = new ElWatcher();
const visWatcher = new ElVisible(0.01);

visWatcher.on('changeDetected', change => console.log(change));
nodeWatcher.on('elAdded', el => visWatcher.watch(el));
nodeWatcher.start();
