require('dotenv').config();
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express, { application } from "express";
import sequelize from './db';
import * as AdminJSSequelize from '@adminjs/sequelize'
import { Category } from "./model/category.entity";
import { Product } from "./model/product.entity";


const PORT = process.env.PORT_HOST;

AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database
})

const generateResource = (model: object) => {
    return {
        resource: model,
        options: {
            properties: {
                createdAt: {
                    isVisible: {
                        list: true, edit: false, create: false, show: true
                    }
                },
                updatedAt: {
                    isVisible: {
                        list: true, edit: false, create: false, show: true
                    }
                }
            }
        }
    }
}

const start = async() => {
    const adminOptions = {
        resources: [
            generateResource(Category),
            generateResource(Product)
        ],
        rootPath: '/admin',
        dashboard: {
            handle: async () => {
                console.log("Log do Dashboard");
            },
            component: AdminJS.bundle('./components/dashboard')
        },
        branding: {
            favicon: 'https://www.saiteria.com.br/icons/favicon-32x32.png',
            logo: 'https://www.saiteria.com.br/img/saiteria.svg',
            companyName: 'Saiteria - Dashboard'
        }
    };
    const app = express();
    sequelize
        .sync()
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    const admin = new AdminJS(adminOptions);
    const adminRouter = AdminJSExpress.buildRouter(admin);
    app.use(admin.options.rootPath, adminRouter)

    app.listen(PORT, () => {
        console.log("Projeto rodando...")
    })
}


start();
