const fs = require('fs');

export interface Patchable {
  patch: () => void;
  path: string;
}

export interface FileUpdatable extends Patchable {
  contents: string;
  addBefore: (line: string, add: string) => void;
  addAfter: (line: string | RegExp, add: string) => void;
  hasLine: (line: string | RegExp) => boolean;
  deleteLine: (line: string | RegExp) => void;
}

export const patchFiles = (...files: Array<() => Promise<Patchable>>): Promise<void> => {
  return chainPromises(...files).then((patchables: Patchable[]) => {
    patchables.map((p) => p.patch());
  });
};

const chainPromises = (...promises: Array<() => Promise<any>>): Promise<any[]> => promises.reduce(
  (prev: Promise<any>, cur: () => Promise<any>) => prev.then(
    (prevRes) => cur().then((curRes) => [...prevRes, curRes])),
  Promise.resolve([]),
);

export const NoopFile = {
  path: '',
  contents: '',
  patch: (): void => {},
  hasLine: (_: string) => false,
  addBefore: (line: string, add: string) => {},
  addAfter: (line: string, add: string) => {},
  deleteLine: (line: string) => {},
};

class FileContents implements FileUpdatable {
  public contents: string;
  public path: string;

  constructor(path: string = '') {
    this.path = path;
    this.contents = fs.readFileSync(path, 'utf8');
  }

  public hasLine(line: string | RegExp): boolean {
    return (line instanceof RegExp ? this.contents.search(line) : this.contents.indexOf(line)) > -1;
  }

  public addBefore(line: string, add: string) {
    if (this.hasLine(line)) {
      this.contents = this.contents.replace(line, `${add}${line}`);
    }
  }

  public addAfter(line: string | RegExp, add: string) {
    if (this.hasLine(line)) {
      let replaceWith = line;
      let space = '';
      if (line instanceof RegExp) {
        const matches = this.contents.match(line) || [];
        if (matches.length === 0) {
            return;
        }
        // If regex starts with space matcher, use space.
        if (line.toString().match(/^\/\(\\s\+\)/)) {
            space = matches[1];
        }
        replaceWith = matches[0];
      }
      this.contents = this.contents.replace(line, `${replaceWith}${space}${add}`);
    }
  }

  public deleteLine(line: string | RegExp) {
    if (this.hasLine(line)) {
      this.contents = this.contents.replace(line, '');
    }
  }

  public patch() {
    fs.writeFileSync(this.path, this.contents);
  }
}

export const getFileContents = (path: string): FileUpdatable => {
  return new FileContents(path);
};
