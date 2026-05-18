import { FormulaCategory, FormulaDefinition } from "./formula";

export class FormulaRegistry {
  private readonly formulas = new Map<string, FormulaDefinition>();

  register(definition: FormulaDefinition): void {
    this.formulas.set(definition.id, definition);
  }

  getById(id: string): FormulaDefinition | undefined {
    return this.formulas.get(id);
  }

  list(): FormulaDefinition[] {
    return [...this.formulas.values()];
  }

  listByCategory(category: FormulaCategory): FormulaDefinition[] {
    return this.list().filter((formula) => formula.category === category);
  }
}
