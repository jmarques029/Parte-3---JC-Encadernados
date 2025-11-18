import { LoginUser } from '@/core/domain/use-cases/LoginUser';
import { RegisterUser } from '@/core/domain/use-cases/RegisterUser';
import { MockUserRepository } from '@/core/infra/mocks/MockUserRepository';
import { VALID_TEST_PASSWORD } from '@/test/helpers/testHelpers';

describe('LoginUser Use Case', () => {
  let loginUser: LoginUser;
  let registerUser: RegisterUser;
  let userRepository: MockUserRepository;

  beforeEach(() => {
    userRepository = MockUserRepository.getInstance();
    userRepository.reset();
    loginUser = new LoginUser(userRepository);
    registerUser = new RegisterUser(userRepository);
  });

  it('should login with correct credentials', async () => {
    await registerUser.execute({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
    });

    const user = await loginUser.execute({
      email: 'test@example.com',
      password: 'Password123!',
    });

    expect(user).toBeDefined();
    expect(user.email.value).toBe('test@example.com');
  });

  it('should throw error with incorrect password', async () => {
    await registerUser.execute({
      name: 'Test User',
      email: 'test@example.com',
      password: 'CorrectPass123!',
    });

    await expect(
      loginUser.execute({
        email: 'test@example.com',
        password: 'WrongPass123!',
      })
    ).rejects.toThrow('Invalid credentials');
  });

  it('should throw error when user not found', async () => {
    await expect(
      loginUser.execute({
        email: 'nonexistent@example.com',
        password: 'Password123!',
      })
    ).rejects.toThrow('Invalid credentials');
  });

  it('should login existing default user', async () => {
    const user = await loginUser.execute({
      email: 'lazaro@cefetmg.br',
      password: '12345@aA',
    });

    expect(user).toBeDefined();
    expect(user.email.value).toBe('lazaro@cefetmg.br');
  });
});
