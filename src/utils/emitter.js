import { EventEmitter } from "events";

const emitter = new EventEmitter();
emitter.setMaxListeners(0); // unlimited listener

export default emitter;
