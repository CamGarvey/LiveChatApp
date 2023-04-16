import IChatDataSource from './chat/chat-datasource.interface';
import IRequestDataSource from './request/request-datasource.interface';
import IUserDataSource from './user/user-datasource.interface';

export default interface IDataSources {
  user: IUserDataSource;
  chat: IChatDataSource;
  request: IRequestDataSource;
}
