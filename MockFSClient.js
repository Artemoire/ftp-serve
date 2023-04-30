const randomNumberBetween = (a, b) => Math.round((Math.random() * (b - a)) + a);
const randomDateTimeBeforeNow = (msRange) => Math.round(new Date() - Math.random() * msRange);

const RANDOM_SIZE = () => randomNumberBetween(512, 1024 ** 3);
const RANDOM_MODIFIED = () => randomDateTimeBeforeNow(1000 * 60 * 60 * 24 * 30 * 24);

const NOT_FOUND = {};
const STRUCTURE = {
    '': {
        "README": RANDOM_SIZE(),
        "SERVER-COMMANDS": {
            "SUPPORTED": {
                "LIST": RANDOM_SIZE(),
                "PWD": RANDOM_SIZE(),
            },
            "UNSUPPORTED": {
                "SYST": RANDOM_SIZE(),
            }
        }
    }
}
const STRUCTURE_SELECT = (path) => path === "/" ? STRUCTURE[""] :
    path.split("/").reduce((dir, path) => (path in dir) ? dir[path] : NOT_FOUND, STRUCTURE);
const STRUCTURE_FILES = (path) => Object.keys(STRUCTURE_SELECT(path));
const STRUCTURE_SIZE_SUM = (path) => STRUCTURE_FILES(path).map(file => path + "/" + file)
    .map(path => STRUCTURE_SIZE(path)).reduce((a, b) => a + b, 0);
const STRUCTURE_SIZE = (path) => (s => typeof s === "number" ? s : STRUCTURE_SIZE_SUM(path))(STRUCTURE_SELECT(path));
const STRUCTURE_IS_DIR = (path) => typeof STRUCTURE_SELECT(path) !== "number";

class MockFSClient {

    constructor() {
        this.workDir = '/';
    }

    async list() {
        return STRUCTURE_FILES(this.workDir).map(fileName => ({
            dir: STRUCTURE_IS_DIR(this.workDir + "/" + fileName),
            size: STRUCTURE_SIZE(this.workDir + "/" + fileName),
            modified: RANDOM_MODIFIED(),
            name: fileName
        }));
    }

    async cwd(workDir) {
        this.workDir = workDir;
    }

}

module.exports = { MockFSClient };