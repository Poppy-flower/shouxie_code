class Person{
    constructor(){
        this.flag = true;
    }

    getData(){
        return new Promise((resolve, reject) => {
            console.log('in getData');
            this.flag = false;
            setTimeout(() => {
                resolve(100);
            }, 1000)
        })
    }

    async test(){
        console.log('this.flag---start', this.flag);
        if(!this.flag){
            return;
        }

        let data = await this.getData();
        console.log('this.flag--behind', this.flag);
        return data;
    }
}

let person1 = new Person();

person1.test();
person1.test();
