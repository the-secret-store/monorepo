import axios from 'axios';
import { Inject, Injectable } from '@nestjs/common';
import { GlobalConfigService } from './GlobalConfigService';

@Injectable()
export class ApiService {
  private axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  });

  constructor(
    @Inject(GlobalConfigService) private readonly globalConfigService: GlobalConfigService
  ) {
    const token = this.globalConfigService.getAccessToken();
    this.axiosInstance.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${token}`;
    });
  }

  public get = this.axiosInstance.get;
  public post = this.axiosInstance.post;
  public patch = this.axiosInstance.patch;
  public put = this.axiosInstance.put;
}
