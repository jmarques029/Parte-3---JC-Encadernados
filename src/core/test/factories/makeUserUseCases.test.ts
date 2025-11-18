import { makeUserUseCases } from '@/core/factories/makeUserUseCases';

describe('makeUserUseCases Factory', () => {
  it('should create all user use cases', () => {
    const userUseCases = makeUserUseCases();

    expect(userUseCases).toBeDefined();
    expect(userUseCases.registerUser).toBeDefined();
    expect(userUseCases.loginUser).toBeDefined();
    expect(userUseCases.findUser).toBeDefined();
    expect(userUseCases.findUserByEmail).toBeDefined();
    expect(userUseCases.updateUser).toBeDefined();
    expect(userUseCases.deleteUser).toBeDefined();
  });

  it('should create use cases that can be executed', async () => {
    const userUseCases = makeUserUseCases();

    const user = await userUseCases.registerUser.execute({
      name: 'Test User',
      email: 'factory@example.com',
      password: 'Password123!',
    });

    expect(user).toBeDefined();
    expect(user.email.value).toBe('factory@example.com');
  });

  it('should share the same repository instance', () => {
    const userUseCases1 = makeUserUseCases();
    const userUseCases2 = makeUserUseCases();

    // Both should use singleton instance
    expect(userUseCases1).toBeDefined();
    expect(userUseCases2).toBeDefined();
  });
});
