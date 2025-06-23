import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'
import { SupabaseService } from '../supabase/supabase.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name)

  constructor(
    private reflector: Reflector,
    private supabaseService: SupabaseService,
  ) {
    super()
  }

  async canActivate(context) {
    const request = context.switchToHttp().getRequest()

    const token = request.headers.authorization?.split(' ')[1]
    if (!token) {
      this.logger.error('No token provided')
      throw new UnauthorizedException()
    }

    const {
      data: { user },
      error,
    } = await this.supabaseService.getClient().auth.getUser(token)
    if (error || !user) {
      this.logger.error('No supabase account linked to the token')
      throw new UnauthorizedException()
    }

    request.user = user
    return true
  }
}
