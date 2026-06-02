import { Formula, FormulaCategory } from "../types";

export class FormulaRegistry {
  private formulas: Map<string, Formula> = new Map();

  /**
   * Register a new formula.
   */
  public register(formula: Formula): void {
    if (this.formulas.has(formula.id)) {
      throw new Error(`Formula with ID '${formula.id}' is already registered.`);
    }
    this.formulas.set(formula.id, formula);
  }

  /**
   * Get a formula by its ID.
   */
  public get(id: string): Formula | undefined {
    return this.formulas.get(id);
  }

  /**
   * List all formulas.
   */
  public list(): Formula[] {
    return Array.from(this.formulas.values());
  }

  /**
   * Get all formulas in a specific category.
   */
  public getByCategory(category: FormulaCategory): Formula[] {
    return this.list().filter(f => f.category === category);
  }

  /**
   * Clear the registry. Useful for testing.
   */
  public clear(): void {
    this.formulas.clear();
  }
}

// Export a singleton instance by default, or let the application create its own
export const defaultRegistry = new FormulaRegistry();
