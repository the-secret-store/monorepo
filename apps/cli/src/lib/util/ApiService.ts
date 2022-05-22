import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  private axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  });

  constructor(token: string) {
    this.axiosInstance.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${token}`;
    });
  }

  public get = this.axiosInstance.get;
  public post = this.axiosInstance.post;
  public patch = this.axiosInstance.patch;
  public put = this.axiosInstance.put;
}
