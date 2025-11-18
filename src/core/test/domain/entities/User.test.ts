import { User } from '@/core/domain/entities/User';
import { Name } from '@/core/domain/value-objects/Name';
import { Email } from '@/core/domain/value-objects/Email';
import { Password } from '@/core/domain/value-objects/Password';
import { VALID_TEST_PASSWORD } from '@/test/helpers/testHelpers';

describe('User Entity', () => {
  it('should create a user with valid data', () => {
    const user = User.create(
      '1',
      Name.create('John Doe'),
      Email.create('john@example.com'),
      Password.create(VALID_TEST_PASSWORD)
    );

    expect(user).toBeDefined();
    expect(user.id).toBe('1');
    expect(user.name.value).toBe('John Doe');
    expect(user.email.value).toBe('john@example.com');
    expect(user.password.value).toBe(VALID_TEST_PASSWORD);
  });

  it('should create multiple distinct users', () => {
    const user1 = User.create(
      '1',
      Name.create('User One'),
      Email.create('user1@example.com'),
      Password.create('Password123!')
    );

    const user2 = User.create(
      '2',
      Name.create('User Two'),
      Email.create('user2@example.com'),
      Password.create('Different456@')
    );

    expect(user1.id).not.toBe(user2.id);
    expect(user1.email.value).not.toBe(user2.email.value);
  });
});
