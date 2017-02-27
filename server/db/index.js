import chalk from 'chalk';
import emoji from 'node-emoji'; // https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json
import nedb from './nedb';
import mongo from './mongo';
import config from '../../config';

export default () => {
    const computer = emoji.get('computer');
    const y = chalk.yellow.bind(chalk);
    if (config.DB_Use_Mongo) {
        console.log(y(`${computer}   Using ${chalk.red('MongoDB')} database`));
        return mongo();
    }
    console.log(y(`${computer}   Using ${chalk.red('NeDB')} database`));
    return nedb();
};
