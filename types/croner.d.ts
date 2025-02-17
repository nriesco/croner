export default Cron;
/**
 * - Cron scheduler options
 */
export type CronOptions = {
    /**
     * - Job is paused
     */
    paused?: boolean;
    /**
     * - Job is about to be killed or killed
     */
    kill?: boolean;
    /**
     * - Continue exection even if a unhandled error is thrown by triggered function
     */
    catch?: boolean;
    /**
     * - Maximum nuber of executions
     */
    maxRuns?: number;
    /**
     * - When to start running
     */
    startAt?: string | Date;
    /**
     * - When to stop running
     */
    stopAt?: string | Date;
    /**
     * - Time zone in Europe/Stockholm format
     */
    timezone?: string;
    /**
     * - Used to pass any object to scheduled function
     */
    context?: unknown;
};
/**
 * Cron entrypoint
 *
 * @constructor
 * @param {string} pattern - Input pattern
 * @param {CronOptions|Function} [options] - Options
 * @param {Function} [func] - Function to be run each iteration of pattern
 * @returns {Cron}
 */
export function Cron(pattern: string, options?: CronOptions | Function, func?: Function): Cron;
export class Cron {
    /**
     * Cron entrypoint
     *
     * @constructor
     * @param {string} pattern - Input pattern
     * @param {CronOptions|Function} [options] - Options
     * @param {Function} [func] - Function to be run each iteration of pattern
     * @returns {Cron}
     */
    constructor(pattern: string, options?: CronOptions | Function, func?: Function);
    /** @type {CronPattern} */
    pattern: CronPattern;
    /** @type {CronOptions} */
    options: CronOptions;
    fn: Function;
    private processOptions;
    /**
     * Find next runtime, based on supplied date. Strips milliseconds.
     *
     * @param {Date} [prev] - Input pattern
     * @returns {Date | null} - Next run time
     */
    next(prev?: Date): Date | null;
    /**
     * Is running?
     * @public
     *
     * @returns {boolean} - Running or not
     */
    public running(): boolean;
    /**
     * Return previous run time
     * @public
     *
     * @returns {Date | null} - Previous run time
     */
    public previous(): Date | null;
    private _next;
    /**
     * Returns number of milliseconds to next run
     * @public
     *
     * @param {Date} [prev] - Starting date, defaults to now
     * @returns {number | null}
     */
    public msToNext(prev?: Date): number | null;
    /**
     * Stop execution
     * @public
     */
    public stop(): void;
    /**
     * Pause executionR
     * @public
     *
     * @returns {boolean} - Wether pause was successful
     */
    public pause(): boolean;
    /**
     * Pause execution
     * @public
     *
     * @returns {boolean} - Wether resume was successful
     */
    public resume(): boolean;
    /**
     * Schedule a new job
     * @public
     *
     * @param {Function} func - Function to be run each iteration of pattern
     * @returns {Cron}
     */
    public schedule(func: Function): Cron;
    previousrun: CronDate;
    currentTimeout: number;
}
import { CronPattern } from "./pattern.js";
import { CronDate } from "./date.js";
