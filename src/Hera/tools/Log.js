/**
 * Created by edeity on 2018/1/6.
 */
class Log {
    static isDebugger = false;
    static log(str) {
        if(Log.isDebugger) {
            console.log(str);
        }
    }
    static warn(str) {
        if(Log.isDebugger) {
            console.warn(str);
        }
    }
    static error(str) {
        if(Log.isDebugger) {
            console.error(str);
        }
    }
}

export default Log;