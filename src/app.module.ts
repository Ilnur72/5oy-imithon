import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { GuidesModule } from './modules/guides/guides.module';
import { UserGuidesModule } from './modules/user-guides/user-guides.module';
import { UsersModule } from './modules/users/users.module';
import { CoreModule } from './shared/core/core.modules';

@Module({
  imports: [
    CoreModule,
    UsersModule,
    AuthModule,
    GuidesModule,
    UserGuidesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
