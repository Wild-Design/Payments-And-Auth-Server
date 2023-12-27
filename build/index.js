import server from './src/app.js';
import DB from './src/db/index.js';
const PORT = process.env.PORT || 3001;
DB.sync().then(() => server.listen(PORT, () => {
    console.log(`server.listen on port ${PORT}`);
}));
