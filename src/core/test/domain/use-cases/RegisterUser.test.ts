import { RegisterUser } from '@/core/domain/use-cases/RegisterUser';
import { MockUserRepository } from '@/core/infra/mocks/MockUserRepository';
import { VALID_TEST_PASSWORD } from '@/test/helpers/testHelpers';

describe('RegisterUser Use Case', () => {
  let registerUser: RegisterUser;
  let userRepository: MockUserRepository;

  beforeEach(() => {
    userRepository = MockUserRepository.getInstance();
    userRepository.reset();
    registerUser = new RegisterUser(userRepository);
  });

  it('should register a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: VALID_TEST_PASSWORD,
    };

    const user = await registerUser.execute(userData);

    expect(user).toBeDefined();
    expect(user.name.value).toBe('John Doe');
    expect(user.email.value).toBe('john@example.com');
    expect(user.id).toBeDefined();
  });

  it('should throw error when registering duplicate email', async () => {
    await registerUser.execute({
      name: 'User One',
      email: 'duplicate@example.com',
      password: VALID_TEST_PASSWORD,
    });

    await expect(
      registerUser.execute({
        name: 'User Two',
        email: 'duplicate@example.com',
        password: 'Different456!',
      })
    ).rejects.toThrow('User already exists');
  });

  it('should create different users with different emails', async () => {
    const user1 = await registerUser.execute({
      name: 'User One',
      email: 'user1@example.com',
      password: 'Password123!',
    });

    const user2 = await registerUser.execute({
      name: 'User Two',
      email: 'user2@example.com',
      password: 'Different456@',
    });

    expect(user1.id).not.toBe(user2.id);
    expect(user1.email.value).not.toBe(user2.email.value);
  });
});
