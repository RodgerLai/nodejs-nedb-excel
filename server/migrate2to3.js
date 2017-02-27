/* eslint no-underscore-dangle: 0 */

import fs from 'fs';
import path from 'path';

export default store => {
    console.log('migrating');
    const file = path.resolve(__dirname, '..', 'persist', 'sessions');
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error('Cannot read file: ', err);
            return;
        }

        const sessions = JSON.parse(data);
        const ids = Object.keys(sessions);

        const promises = ids.map(id => {
            const session = sessions[id];
            session.id = id;
            delete session._id;
            session.posts.forEach(p => {
                p.likes = [];
                p.dislikes = [];
                for (let i = 0; i < p.votes; i += 1) {
                    p.likes.push('?');
                }
            });

            return store.set(session);
        });

        Promise.all(promises).then(() => {
            console.log('Migration done');
        }).catch(err2 => {
            console.error(err2);
        });
    });
};
