export interface Field {
  name: string;
  fetch: () => Promise<any>;
}

export interface Step {
    name: string;
    run: (wizard: Wizard) => Promise<any>;
}

class Wizard {
    private fields: {[name: string]: Field};
    private steps: Step[];
    private fieldValues: {[name: string]: any};

    constructor() {
        this.fields = {};
        this.steps = [];
        this.fieldValues = {};
    }

    public registerField(field: Field) {
        this.fields[field.name] = field;
    }

    public registerStep(step: Step) {
        this.steps = this.steps.concat(step);
    }

    public fieldValue(field: Field): Promise<any> {
        const value = this.fieldValues[field.name];
        if (value !== undefined) {
            return Promise.resolve(value);
        }
        return field.fetch().then((val: any) => {
            this.fieldValues[field.name] = val;
            return val;
        });
    }

    public fieldValueList(list: Field[]): Promise<any[]> {
        return list.reduce(
            (chain: Promise<any[]>, field: Field): Promise<any[]> => chain.then((results) => field.fetch().then((res) => [...results, res])),
            Promise.resolve([])
        );
    }

    public runSteps(): Promise<any[]> {
        return this.steps.reduce(
            (chain: Promise<any[]>, step: Step): Promise<any[]> => chain.then((results) => step.run(this).then((res) => [...results, res])),
            Promise.resolve([])
        );
    }
}

export default Wizard;
