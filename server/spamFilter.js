import moment from 'moment';
import chalk from 'chalk';

const g = chalk.green.bind(chalk);
const gr = chalk.grey.bind(chalk);
const r = chalk.red.bind(chalk);
const y = chalk.yellow.bind(chalk);

const startupDuration = 30;             // Initial window where we allow a higher rate
const startupDurationRateLimit = 30;    // Initial rate allowed
const rateLimit = 10;                   // Regular rate allowed
const bansBeforeFullBan = 5;            // Number of bans before definitive ban
const banDuration = 30 * 60;            // Non-definitive ban duration (seconds)
const resetAfter = 6 * 60 * 60;         // Reset stats after 6 hours

const d = () => y(`[${moment().format('HH:mm:ss')}]`);

const ips = {};

const calculateStats = record => {
    const age = moment().diff(record.started, 'seconds');
    const rate = age > 0 ? record.calls / age : 0;
    record.age = age;
    record.rate = rate;
    return record;
};

const shouldBan = record => {
    if (record.age < startupDuration && record.rate > startupDurationRateLimit) {
        return true;
    }

    return record.age > startupDuration && record.rate > rateLimit;
};

const shouldUnban = record => {
    if (record.bannedUntil < moment() && record.bans <= bansBeforeFullBan) {
        return true;
    }

    return false;
};

const shouldReset = record => {
    if (moment().diff(record.last, 's') > resetAfter) {
        return true;
    }

    return false;
};

export default (ip, cb) => {
    if (!ips[ip] || shouldReset(ips[ip])) {
        ips[ip] = {
            started: moment(),
            last: moment(),
            bannedUntil: null,
            calls: 0,
            bans: 0,
            banned: false
        };
    }

    const record = ips[ip];

    record.calls += 1;

    if (record.banned) {
        if (shouldUnban(record)) {
            record.banned = false;
            record.bannedUntil = null;
        } else {
            return;
        }
    }

    calculateStats(record);

    if (shouldBan(record)) {
        record.banned = true;
        record.bans += 1;
        record.bannedUntil = moment().add(banDuration, 's');
        console.log(`${d() + r(' >> FLOOD BLOCK << ') + g(ip)} ${gr(JSON.stringify(record))}`);
        console.log(gr(`Banned until ${record.bannedUntil.format('HH:mm:ss')}`));
    } else {
        cb();
    }
};
