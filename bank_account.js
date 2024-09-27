class BankAccount {
    #password;

    constructor(owner, username, password, balance = 0) {
        this.owner = owner;
        this.username = username;
        this.#password = this.#encrypt(password);
        this.balance = balance;
    }

    #encrypt(password) {
        return `encrypted-${password}`;
    }

    #decrypt(encryptedPassword) {
        return encryptedPassword.split('encrypted-')[1];
    }

    verifyLogin(inputUsername, inputPassword) {
        const decryptedPassword = this.#decrypt(this.#password);
        return this.username === inputUsername && decryptedPassword === inputPassword;
    }

    async deposit(amount) {
        return new Promise((resolve, reject) => {
            if (amount <= 0) {
                reject(new Error("Jumlah yang disetor harus lebih dari 0"));
            } else {
                console.log(`Menyetor ${amount} ke akun ${this.owner}...`);
                setTimeout(() => {
                    this.balance += amount;
                    console.log(`Setoran berhasil! Saldo baru: ${this.balance}`);
                    resolve(this.balance);
                }, 2000);
            }
        });
    }

    async withdraw(amount) {
        return new Promise((resolve, reject) => {
            console.log(`Menarik ${amount} dari akun ${this.owner}...`);
            setTimeout(() => {
                if (this.balance - amount < 50) {
                    reject(new Error('Saldo tidak mencukupi! Saldo minimal adalah 50.'));
                } else if (amount > this.balance) {
                    reject(new Error('Saldo tidak mencukupi!'));
                } else if (amount <= 0) {
                    reject(new Error('Jumlah penarikan harus lebih dari 0'));
                } else {
                    this.balance -= amount;
                    console.log(`Penarikan berhasil! Saldo baru: ${this.balance}`);
                    resolve(this.balance);
                }
            }, 2000);
        });
    }

    checkBalance() {
        return `Saldo akun untuk ${this.owner}: ${this.balance}`;
    }
}

module.exports = BankAccount;