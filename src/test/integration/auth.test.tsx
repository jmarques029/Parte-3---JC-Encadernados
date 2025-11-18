import { makeUserUseCases } from '@/core/factories/makeUserUseCases';
import { MockUserRepository } from '@/core/infra/mocks/MockUserRepository';

describe('Auth Integration Tests', () => {
  let userUseCases: ReturnType<typeof makeUserUseCases>;
  let userRepository: MockUserRepository;

  beforeEach(() => {
    userRepository = MockUserRepository.getInstance();
    userRepository.reset();
    userUseCases = makeUserUseCases();
  });

  it('should register a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123!',
    };

    const user = await userUseCases.registerUser.execute(userData);

    expect(user).toBeDefined();
    expect(user.name.value).toBe('John Doe');
    expect(user.email.value).toBe('john@example.com');
  });

  it('should login with correct credentials', async () => {
    await userUseCases.registerUser.execute({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'Password123!',
    });

    const loggedInUser = await userUseCases.loginUser.execute({
      email: 'jane@example.com',
      password: 'Password123!',
    });

    expect(loggedInUser).toBeDefined();
    expect(loggedInUser.email.value).toBe('jane@example.com');
  });

  it('should throw error with incorrect password', async () => {
    await userUseCases.registerUser.execute({
      name: 'Test User',
      email: 'test@example.com',
      password: 'CorrectPass123!',
    });

    await expect(
      userUseCases.loginUser.execute({
        email: 'test@example.com',
        password: 'WrongPass123!',
      })
    ).rejects.toThrow();
  });

  it('should throw error when user not found', async () => {
    await expect(
      userUseCases.loginUser.execute({
        email: 'nonexistent@example.com',
        password: 'Password123!',
      })
    ).rejects.toThrow('Invalid credentials');
  });

  it('should find user by email', async () => {
    await userUseCases.registerUser.execute({
      name: 'Find User',
      email: 'find@example.com',
      password: 'Password123!',
    });

    const foundUser = await userUseCases.findUserByEmail.execute({
      email: 'find@example.com',
    });

    expect(foundUser).toBeDefined();
    expect(foundUser?.email.value).toBe('find@example.com');
  });

  it('should throw error when registering duplicate email', async () => {
    await userUseCases.registerUser.execute({
      name: 'User One',
      email: 'duplicate@example.com',
      password: 'Password123!',
    });

    await expect(
      userUseCases.registerUser.execute({
        name: 'User Two',
        email: 'duplicate@example.com',
        password: 'password456',
      })
    ).rejects.toThrow();
  });
});
