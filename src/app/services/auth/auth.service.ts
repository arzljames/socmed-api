import { Injectable } from "@nestjs/common";


@Injectable()
export class AuthService {
    helloWorld(): string {
        return "Hello World"
    }
}