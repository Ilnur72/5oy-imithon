import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CoreModule } from './shared/core/core.modules';
import { AuthModule } from './modules/auth/auth.module';
import { GuidesModule } from './modules/guides/guides.module';
import { UserGuidesModule } from './modules/user-guides/user-guides.module';

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
