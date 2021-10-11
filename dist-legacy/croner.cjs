!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Cron=e():t.Cron=e()}(this,(function(){return(()=>{"use strict";var t={d:(e,r)=>{for(var s in r)t.o(r,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:r[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{default:()=>i});function r(t,e){if(this.timezone=e,t&&t instanceof Date)this.fromDate(t);else if(void 0===t)this.fromDate(new Date);else if(t&&"string"==typeof t)this.fromString(t);else{if(!(t instanceof r))throw new TypeError("CronDate: Invalid type passed as parameter to CronDate constructor");this.fromCronDate(t)}}function s(t){this.pattern=t,this.seconds=Array(60).fill(0),this.minutes=Array(60).fill(0),this.hours=Array(24).fill(0),this.days=Array(31).fill(0),this.months=Array(12).fill(0),this.daysOfWeek=Array(8).fill(0),this.parse()}r.prototype.fromDate=function(t){let e=t.getTime();this.timezone&&(t=function(t,e){return new Date(t.toLocaleString("en-US",{timeZone:e}))}(t,this.timezone));let r=t.getTime();this.UTCmsOffset=r-e,this.milliseconds=t.getMilliseconds(),this.seconds=t.getSeconds(),this.minutes=t.getMinutes(),this.hours=t.getHours(),this.days=t.getDate(),this.months=t.getMonth(),this.years=t.getFullYear()},r.prototype.fromCronDate=function(t){this.UTCmsOffset=t.UTCmsOffset,this.milliseconds=t.milliseconds,this.seconds=t.seconds,this.minutes=t.minutes,this.hours=t.hours,this.days=t.days,this.months=t.months,this.years=t.years},r.prototype.fromString=function(t){let e=Date.parse(t);if(isNaN(e))throw new TypeError("CronDate: Provided string value for CronDate could not be parsed as date.");this.fromDate(new Date(e))},r.prototype.increment=function(t){this.seconds+=1,this.milliseconds=0;let e=this,r=function(t,r,s,o){for(let n=void 0===o?e[t]+s:0+s;n<r[t].length;n++)if(r[t][n])return e[t]=n-s,!0;return!1},s=[["seconds","minutes",0],["minutes","hours",0],["hours","days",0],["days","months",-1],["months","years",0]],o=0;for(;o<5;){if(!r(s[o][0],t,s[o][2]))for(this[s[o][1]]++;o>=0;)r(s[o][0],t,s[o][2],0),o--;o++}for(;!t.daysOfWeek[this.getDate().getDay()];)this.days+=1;return this},r.prototype.getDate=function(){return new Date(this.years,this.months,this.days,this.hours,this.minutes,this.seconds,this.milliseconds-this.UTCmsOffset)},r.prototype.getTime=function(){return new Date(this.years,this.months,this.days,this.hours,this.minutes,this.seconds,this.milliseconds-this.UTCmsOffset).getTime()},s.prototype.parse=function(){if("string"!=typeof this.pattern&&this.pattern.constructor!==String)throw new TypeError("CronPattern: Pattern has to be of type string.");let t,e,r,s,o,n=this.pattern.trim().replace(/\s+/g," ").split(" "),i=/[^/*0-9,-]+/;if(n.length<5||n.length>6)throw new TypeError("CronPattern: invalid configuration format ('"+this.pattern+"'), exacly five or six space separated parts required.");for(5===n.length&&n.unshift("0"),e=0;e<n.length;e++)if(t=n[e].trim(),i.test(t))throw new TypeError("CronPattern: configuration entry "+(e+1)+" ("+t+") contains illegal characters.");if(r="*"!==n[4],s="*"!==n[5],o="*"!==n[3],s&&(r||o))throw new TypeError("CronPattern: configuration invalid, you can not combine month/date with day of week.");this.partToArray("seconds",n[0],0),this.partToArray("minutes",n[1],0),this.partToArray("hours",n[2],0),this.partToArray("days",n[3],-1),this.partToArray("months",n[4],-1),this.partToArray("daysOfWeek",n[5],0),this.daysOfWeek[7]&&(this.daysOfWeek[0]=1)},s.prototype.partToArray=function(t,e,r){let s,o,n,i,a,h=this[t];if("*"!==e)if(o=e.split(","),o.length>1)for(s=0;s<o.length;s++)this.partToArray(t,o[s],r);else if(-1!==e.indexOf("-")){if(o=e.split("-"),2!==o.length)throw new TypeError("CronPattern: Syntax error, illegal range: '"+e+"'");if(n=parseInt(o[0],10)+r,i=parseInt(o[1],10)+r,isNaN(n))throw new TypeError("CronPattern: Syntax error, illegal lower range (NaN)");if(isNaN(i))throw new TypeError("CronPattern: Syntax error, illegal upper range (NaN)");if(n<0||i>=h.length)throw new TypeError("CronPattern: Value out of range: '"+e+"'");if(n>i)throw new TypeError("CronPattern: From value is larger than to value: '"+e+"'");for(s=n;s<=i;s++)h[s+r]=1}else if(-1!==e.indexOf("/")){if(o=e.split("/"),2!==o.length)throw new TypeError("CronPattern: Syntax error, illegal stepping: '"+e+"'");if("*"!==o[0])throw new TypeError("CronPattern: Syntax error, left part of / needs to be * : '"+e+"'");if(a=parseInt(o[1],10),isNaN(a))throw new TypeError("CronPattern: Syntax error, illegal stepping: (NaN)");if(0===a)throw new TypeError("CronPattern: Syntax error, illegal stepping: 0");if(a>h.length)throw new TypeError("CronPattern: Syntax error, steps cannot be greater than maximum value of part ("+h.length+")");for(s=0;s<h.length;s+=a)h[s+r]=1}else{if(s=parseInt(e,10)+r,s<0||s>=h.length)throw new TypeError("CronPattern: "+t+" value out of range: '"+e+"'");h[s]=1}else for(s=0;s<h.length;s++)h[s]=1};const o=Math.pow(2,31)-1;function n(t,e,r){let o=this;return this instanceof n?(o.pattern=new s(t),o.schedulerDefaults={maxRuns:1/0,kill:!1},"function"==typeof e&&(r=e,e={}),o.opts=o.validateOpts(e||{}),void 0===r?o:this.schedule(e,r)):new n(t,e,r)}n.prototype.next=function(t){let e=this._next(t);return e?e.getDate():null},n.prototype.previous=function(){return this.opts.previous?this.opts.previous.getDate():null},n.prototype._next=function(t){t=new r(t,this.opts.timezone),this.opts.startAt&&t&&t.getTime()<this.opts.startAt.getTime()&&(t=new r(this.opts.startAt,this.opts.timezone));let e=new r(t,this.opts.timezone).increment(this.pattern);return this.opts.maxRuns<=0||this.opts.kill||this.opts.stopAt&&e.getTime()>=this.opts.stopAt.getTime()?null:e},n.prototype.validateOpts=function(t){return t.startAt&&(t.startAt=new r(t.startAt,t.timezone)),t.stopAt&&(t.stopAt=new r(t.stopAt,t.timezone)),t},n.prototype.msToNext=function(t){t=t||new r(void 0,this.opts.timezone);let e=this._next(t);return e?e.getTime()-t.getTime():null},n.prototype.schedule=function(t,e){e||(e=t,t=this.opts),t.paused=void 0!==t.paused&&t.paused,t.kill=t.kill||this.schedulerDefaults.kill,t.maxRuns||0===t.maxRuns||(t.maxRuns=this.schedulerDefaults.maxRuns),this.opts=this.validateOpts(t||{}),this._schedule(t,e)},n.prototype._schedule=function(t,e){let s,n=this,i=n.maxDelay||o;if(s=this.msToNext(n.opts.previous),null!==s)return s>i&&(s=i),n.opts.currentTimeout=setTimeout((function(){s!==i&&(n.opts.paused||(n.opts.maxRuns--,e()),n.opts.previous=new r(n.opts.previous,n.opts.timezone)),n._schedule(n.opts,e)}),s),{stop:function(){n.opts.kill=!0,n.opts.currentTimeout&&clearTimeout(n.opts.currentTimeout)},pause:function(){return(n.opts.paused=!0)&&!n.opts.kill},resume:function(){return!(n.opts.paused=!1)&&!n.opts.kill}}};const i=n;return e.default})()}));