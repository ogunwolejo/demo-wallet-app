import { Knex, knex } from 'knex';
import config from 'config';

class DataBase {
    public dbConfig: any = config.get('db');
    public connection: any;

    constructor() {
        this.connection = knex({
            client: 'mysql2',
            connection: {
                host: this.dbConfig.host,
                port: this.dbConfig.port,
                user: this.dbConfig.username,
                password: this.dbConfig.password,
                database: this.dbConfig.database,
            },
            pool: { min: 0, max: 7 },
        });

        this.connection
            .raw('SELECT VERSION()')
            .then((data:any) => data).catch((e:any) => e);
        
        this.connection.schema.hasTable('Users', 'Wallet').then((exist: any) => {
            if (!exist) {
                this.createAppTable();               
            }
        })
    }

    private async createAppTable() {
        try {
            //Users table
            await this.connection.schema.createTable('Users', (table: any) => {
                table.string('id', 300).primary('id', {
                    constraintName: 'users_primary_key',
                    deferrable: 'deferred',
                });
                table.string('fullName', 200);
                table.integer('age');
                table.string('contact', 200, {});
                table.string('email', 200).unique();
                    table.string('bvn', 200);
                table.string('tax_ref', 200);
                table.string('password', 200);
                //@ts-ignore
                table
                    .timestamp('created_at', { precision: 6 })
                    .defaultTo(this.connection.fn.now(6));
            });

            // wallet table
            await this.connection.schema.createTable('Wallet', (table: any) => {
                table.string('id', 300).primary('id', {
                    constraintName: 'wallet_primary_key',
                    deferrable: 'deferred',
                });
                table.string('flutterwave_account_number');
                table.string('flutterwave_back_name');
                table
                    .string('wallet_user')
                    .notNullable()
                    .references('id')
                    .inTable('Users')
                    .onDelete('CASCADE');
                table
                    .timestamp('created_at', { precision: 6 })
                    .defaultTo(this.connection.fn.now(6));
            });
        } catch (e) {
            console.log(e);
        }
    }
}

export default DataBase;
