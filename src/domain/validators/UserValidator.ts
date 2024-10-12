import UserEntity from "@domain/entities/userEntity";

class UserValidator {
  static validate(user: UserEntity) {
    this.validateEmail(user.email);
    this.validatePassword(user.password);
    this.validateRole(user.role);
  }

  private static validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email formats');
    }
  }

  private static validatePassword(password: string) {
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
  }

  private static validateRole(role: string) {
    const validRoles = ['user', 'admin'];
    if (!validRoles.includes(role)) {
      throw new Error(`Role must be one of: ${validRoles.join(', ')}`);
    }
  }
}


export default UserValidator;