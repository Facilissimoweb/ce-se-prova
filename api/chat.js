var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/drizzle-orm/entity.js
function is(value, type) {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (value instanceof type) {
    return true;
  }
  if (!Object.prototype.hasOwnProperty.call(type, entityKind)) {
    throw new Error(
      `Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`
    );
  }
  let cls = Object.getPrototypeOf(value).constructor;
  if (cls) {
    while (cls) {
      if (entityKind in cls && cls[entityKind] === type[entityKind]) {
        return true;
      }
      cls = Object.getPrototypeOf(cls);
    }
  }
  return false;
}
var entityKind;
var init_entity = __esm({
  "node_modules/drizzle-orm/entity.js"() {
    entityKind = /* @__PURE__ */ Symbol.for("drizzle:entityKind");
  }
});

// node_modules/drizzle-orm/column.js
var Column;
var init_column = __esm({
  "node_modules/drizzle-orm/column.js"() {
    init_entity();
    Column = class {
      constructor(table, config2) {
        this.table = table;
        this.config = config2;
        this.name = config2.name;
        this.keyAsName = config2.keyAsName;
        this.notNull = config2.notNull;
        this.default = config2.default;
        this.defaultFn = config2.defaultFn;
        this.onUpdateFn = config2.onUpdateFn;
        this.hasDefault = config2.hasDefault;
        this.primary = config2.primaryKey;
        this.isUnique = config2.isUnique;
        this.uniqueName = config2.uniqueName;
        this.uniqueType = config2.uniqueType;
        this.dataType = config2.dataType;
        this.columnType = config2.columnType;
        this.generated = config2.generated;
        this.generatedIdentity = config2.generatedIdentity;
      }
      static [entityKind] = "Column";
      name;
      keyAsName;
      primary;
      notNull;
      default;
      defaultFn;
      onUpdateFn;
      hasDefault;
      isUnique;
      uniqueName;
      uniqueType;
      dataType;
      columnType;
      enumValues = void 0;
      generated = void 0;
      generatedIdentity = void 0;
      config;
      mapFromDriverValue(value) {
        return value;
      }
      mapToDriverValue(value) {
        return value;
      }
      // ** @internal */
      shouldDisableInsert() {
        return this.config.generated !== void 0 && this.config.generated.type !== "byDefault";
      }
    };
  }
});

// node_modules/drizzle-orm/column-builder.js
var ColumnBuilder;
var init_column_builder = __esm({
  "node_modules/drizzle-orm/column-builder.js"() {
    init_entity();
    ColumnBuilder = class {
      static [entityKind] = "ColumnBuilder";
      config;
      constructor(name, dataType, columnType) {
        this.config = {
          name,
          keyAsName: name === "",
          notNull: false,
          default: void 0,
          hasDefault: false,
          primaryKey: false,
          isUnique: false,
          uniqueName: void 0,
          uniqueType: void 0,
          dataType,
          columnType,
          generated: void 0
        };
      }
      /**
       * Changes the data type of the column. Commonly used with `json` columns. Also, useful for branded types.
       *
       * @example
       * ```ts
       * const users = pgTable('users', {
       * 	id: integer('id').$type<UserId>().primaryKey(),
       * 	details: json('details').$type<UserDetails>().notNull(),
       * });
       * ```
       */
      $type() {
        return this;
      }
      /**
       * Adds a `not null` clause to the column definition.
       *
       * Affects the `select` model of the table - columns *without* `not null` will be nullable on select.
       */
      notNull() {
        this.config.notNull = true;
        return this;
      }
      /**
       * Adds a `default <value>` clause to the column definition.
       *
       * Affects the `insert` model of the table - columns *with* `default` are optional on insert.
       *
       * If you need to set a dynamic default value, use {@link $defaultFn} instead.
       */
      default(value) {
        this.config.default = value;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Adds a dynamic default value to the column.
       * The function will be called when the row is inserted, and the returned value will be used as the column value.
       *
       * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
       */
      $defaultFn(fn) {
        this.config.defaultFn = fn;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Alias for {@link $defaultFn}.
       */
      $default = this.$defaultFn;
      /**
       * Adds a dynamic update value to the column.
       * The function will be called when the row is updated, and the returned value will be used as the column value if none is provided.
       * If no `default` (or `$defaultFn`) value is provided, the function will be called when the row is inserted as well, and the returned value will be used as the column value.
       *
       * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
       */
      $onUpdateFn(fn) {
        this.config.onUpdateFn = fn;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Alias for {@link $onUpdateFn}.
       */
      $onUpdate = this.$onUpdateFn;
      /**
       * Adds a `primary key` clause to the column definition. This implicitly makes the column `not null`.
       *
       * In SQLite, `integer primary key` implicitly makes the column auto-incrementing.
       */
      primaryKey() {
        this.config.primaryKey = true;
        this.config.notNull = true;
        return this;
      }
      /** @internal Sets the name of the column to the key within the table definition if a name was not given. */
      setName(name) {
        if (this.config.name !== "") return;
        this.config.name = name;
      }
    };
  }
});

// node_modules/drizzle-orm/table.utils.js
var TableName;
var init_table_utils = __esm({
  "node_modules/drizzle-orm/table.utils.js"() {
    TableName = /* @__PURE__ */ Symbol.for("drizzle:Name");
  }
});

// node_modules/drizzle-orm/pg-core/foreign-keys.js
var ForeignKeyBuilder, ForeignKey;
var init_foreign_keys = __esm({
  "node_modules/drizzle-orm/pg-core/foreign-keys.js"() {
    init_entity();
    init_table_utils();
    ForeignKeyBuilder = class {
      static [entityKind] = "PgForeignKeyBuilder";
      /** @internal */
      reference;
      /** @internal */
      _onUpdate = "no action";
      /** @internal */
      _onDelete = "no action";
      constructor(config2, actions) {
        this.reference = () => {
          const { name, columns, foreignColumns } = config2();
          return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
        };
        if (actions) {
          this._onUpdate = actions.onUpdate;
          this._onDelete = actions.onDelete;
        }
      }
      onUpdate(action) {
        this._onUpdate = action === void 0 ? "no action" : action;
        return this;
      }
      onDelete(action) {
        this._onDelete = action === void 0 ? "no action" : action;
        return this;
      }
      /** @internal */
      build(table) {
        return new ForeignKey(table, this);
      }
    };
    ForeignKey = class {
      constructor(table, builder) {
        this.table = table;
        this.reference = builder.reference;
        this.onUpdate = builder._onUpdate;
        this.onDelete = builder._onDelete;
      }
      static [entityKind] = "PgForeignKey";
      reference;
      onUpdate;
      onDelete;
      getName() {
        const { name, columns, foreignColumns } = this.reference();
        const columnNames = columns.map((column) => column.name);
        const foreignColumnNames = foreignColumns.map((column) => column.name);
        const chunks = [
          this.table[TableName],
          ...columnNames,
          foreignColumns[0].table[TableName],
          ...foreignColumnNames
        ];
        return name ?? `${chunks.join("_")}_fk`;
      }
    };
  }
});

// node_modules/drizzle-orm/tracing-utils.js
function iife(fn, ...args) {
  return fn(...args);
}
var init_tracing_utils = __esm({
  "node_modules/drizzle-orm/tracing-utils.js"() {
  }
});

// node_modules/drizzle-orm/pg-core/unique-constraint.js
function uniqueKeyName(table, columns) {
  return `${table[TableName]}_${columns.join("_")}_unique`;
}
var UniqueConstraintBuilder, UniqueOnConstraintBuilder, UniqueConstraint;
var init_unique_constraint = __esm({
  "node_modules/drizzle-orm/pg-core/unique-constraint.js"() {
    init_entity();
    init_table_utils();
    UniqueConstraintBuilder = class {
      constructor(columns, name) {
        this.name = name;
        this.columns = columns;
      }
      static [entityKind] = "PgUniqueConstraintBuilder";
      /** @internal */
      columns;
      /** @internal */
      nullsNotDistinctConfig = false;
      nullsNotDistinct() {
        this.nullsNotDistinctConfig = true;
        return this;
      }
      /** @internal */
      build(table) {
        return new UniqueConstraint(table, this.columns, this.nullsNotDistinctConfig, this.name);
      }
    };
    UniqueOnConstraintBuilder = class {
      static [entityKind] = "PgUniqueOnConstraintBuilder";
      /** @internal */
      name;
      constructor(name) {
        this.name = name;
      }
      on(...columns) {
        return new UniqueConstraintBuilder(columns, this.name);
      }
    };
    UniqueConstraint = class {
      constructor(table, columns, nullsNotDistinct, name) {
        this.table = table;
        this.columns = columns;
        this.name = name ?? uniqueKeyName(this.table, this.columns.map((column) => column.name));
        this.nullsNotDistinct = nullsNotDistinct;
      }
      static [entityKind] = "PgUniqueConstraint";
      columns;
      name;
      nullsNotDistinct = false;
      getName() {
        return this.name;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/utils/array.js
function parsePgArrayValue(arrayString, startFrom, inQuotes) {
  for (let i = startFrom; i < arrayString.length; i++) {
    const char2 = arrayString[i];
    if (char2 === "\\") {
      i++;
      continue;
    }
    if (char2 === '"') {
      return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i + 1];
    }
    if (inQuotes) {
      continue;
    }
    if (char2 === "," || char2 === "}") {
      return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i];
    }
  }
  return [arrayString.slice(startFrom).replace(/\\/g, ""), arrayString.length];
}
function parsePgNestedArray(arrayString, startFrom = 0) {
  const result = [];
  let i = startFrom;
  let lastCharIsComma = false;
  while (i < arrayString.length) {
    const char2 = arrayString[i];
    if (char2 === ",") {
      if (lastCharIsComma || i === startFrom) {
        result.push("");
      }
      lastCharIsComma = true;
      i++;
      continue;
    }
    lastCharIsComma = false;
    if (char2 === "\\") {
      i += 2;
      continue;
    }
    if (char2 === '"') {
      const [value2, startFrom2] = parsePgArrayValue(arrayString, i + 1, true);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    if (char2 === "}") {
      return [result, i + 1];
    }
    if (char2 === "{") {
      const [value2, startFrom2] = parsePgNestedArray(arrayString, i + 1);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    const [value, newStartFrom] = parsePgArrayValue(arrayString, i, false);
    result.push(value);
    i = newStartFrom;
  }
  return [result, i];
}
function parsePgArray(arrayString) {
  const [result] = parsePgNestedArray(arrayString, 1);
  return result;
}
function makePgArray(array) {
  return `{${array.map((item) => {
    if (Array.isArray(item)) {
      return makePgArray(item);
    }
    if (typeof item === "string") {
      return `"${item.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    }
    return `${item}`;
  }).join(",")}}`;
}
var init_array = __esm({
  "node_modules/drizzle-orm/pg-core/utils/array.js"() {
  }
});

// node_modules/drizzle-orm/pg-core/columns/common.js
var PgColumnBuilder, PgColumn, ExtraConfigColumn, IndexedColumn, PgArrayBuilder, PgArray;
var init_common = __esm({
  "node_modules/drizzle-orm/pg-core/columns/common.js"() {
    init_column_builder();
    init_column();
    init_entity();
    init_foreign_keys();
    init_tracing_utils();
    init_unique_constraint();
    init_array();
    PgColumnBuilder = class extends ColumnBuilder {
      foreignKeyConfigs = [];
      static [entityKind] = "PgColumnBuilder";
      array(size) {
        return new PgArrayBuilder(this.config.name, this, size);
      }
      references(ref, actions = {}) {
        this.foreignKeyConfigs.push({ ref, actions });
        return this;
      }
      unique(name, config2) {
        this.config.isUnique = true;
        this.config.uniqueName = name;
        this.config.uniqueType = config2?.nulls;
        return this;
      }
      generatedAlwaysAs(as) {
        this.config.generated = {
          as,
          type: "always",
          mode: "stored"
        };
        return this;
      }
      /** @internal */
      buildForeignKeys(column, table) {
        return this.foreignKeyConfigs.map(({ ref, actions }) => {
          return iife(
            (ref2, actions2) => {
              const builder = new ForeignKeyBuilder(() => {
                const foreignColumn = ref2();
                return { columns: [column], foreignColumns: [foreignColumn] };
              });
              if (actions2.onUpdate) {
                builder.onUpdate(actions2.onUpdate);
              }
              if (actions2.onDelete) {
                builder.onDelete(actions2.onDelete);
              }
              return builder.build(table);
            },
            ref,
            actions
          );
        });
      }
      /** @internal */
      buildExtraConfigColumn(table) {
        return new ExtraConfigColumn(table, this.config);
      }
    };
    PgColumn = class extends Column {
      constructor(table, config2) {
        if (!config2.uniqueName) {
          config2.uniqueName = uniqueKeyName(table, [config2.name]);
        }
        super(table, config2);
        this.table = table;
      }
      static [entityKind] = "PgColumn";
    };
    ExtraConfigColumn = class extends PgColumn {
      static [entityKind] = "ExtraConfigColumn";
      getSQLType() {
        return this.getSQLType();
      }
      indexConfig = {
        order: this.config.order ?? "asc",
        nulls: this.config.nulls ?? "last",
        opClass: this.config.opClass
      };
      defaultConfig = {
        order: "asc",
        nulls: "last",
        opClass: void 0
      };
      asc() {
        this.indexConfig.order = "asc";
        return this;
      }
      desc() {
        this.indexConfig.order = "desc";
        return this;
      }
      nullsFirst() {
        this.indexConfig.nulls = "first";
        return this;
      }
      nullsLast() {
        this.indexConfig.nulls = "last";
        return this;
      }
      /**
       * ### PostgreSQL documentation quote
       *
       * > An operator class with optional parameters can be specified for each column of an index.
       * The operator class identifies the operators to be used by the index for that column.
       * For example, a B-tree index on four-byte integers would use the int4_ops class;
       * this operator class includes comparison functions for four-byte integers.
       * In practice the default operator class for the column's data type is usually sufficient.
       * The main point of having operator classes is that for some data types, there could be more than one meaningful ordering.
       * For example, we might want to sort a complex-number data type either by absolute value or by real part.
       * We could do this by defining two operator classes for the data type and then selecting the proper class when creating an index.
       * More information about operator classes check:
       *
       * ### Useful links
       * https://www.postgresql.org/docs/current/sql-createindex.html
       *
       * https://www.postgresql.org/docs/current/indexes-opclass.html
       *
       * https://www.postgresql.org/docs/current/xindex.html
       *
       * ### Additional types
       * If you have the `pg_vector` extension installed in your database, you can use the
       * `vector_l2_ops`, `vector_ip_ops`, `vector_cosine_ops`, `vector_l1_ops`, `bit_hamming_ops`, `bit_jaccard_ops`, `halfvec_l2_ops`, `sparsevec_l2_ops` options, which are predefined types.
       *
       * **You can always specify any string you want in the operator class, in case Drizzle doesn't have it natively in its types**
       *
       * @param opClass
       * @returns
       */
      op(opClass) {
        this.indexConfig.opClass = opClass;
        return this;
      }
    };
    IndexedColumn = class {
      static [entityKind] = "IndexedColumn";
      constructor(name, keyAsName, type, indexConfig) {
        this.name = name;
        this.keyAsName = keyAsName;
        this.type = type;
        this.indexConfig = indexConfig;
      }
      name;
      keyAsName;
      type;
      indexConfig;
    };
    PgArrayBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgArrayBuilder";
      constructor(name, baseBuilder, size) {
        super(name, "array", "PgArray");
        this.config.baseBuilder = baseBuilder;
        this.config.size = size;
      }
      /** @internal */
      build(table) {
        const baseColumn = this.config.baseBuilder.build(table);
        return new PgArray(
          table,
          this.config,
          baseColumn
        );
      }
    };
    PgArray = class _PgArray extends PgColumn {
      constructor(table, config2, baseColumn, range) {
        super(table, config2);
        this.baseColumn = baseColumn;
        this.range = range;
        this.size = config2.size;
      }
      size;
      static [entityKind] = "PgArray";
      getSQLType() {
        return `${this.baseColumn.getSQLType()}[${typeof this.size === "number" ? this.size : ""}]`;
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          value = parsePgArray(value);
        }
        return value.map((v) => this.baseColumn.mapFromDriverValue(v));
      }
      mapToDriverValue(value, isNestedArray = false) {
        const a = value.map(
          (v) => v === null ? null : is(this.baseColumn, _PgArray) ? this.baseColumn.mapToDriverValue(v, true) : this.baseColumn.mapToDriverValue(v)
        );
        if (isNestedArray) return a;
        return makePgArray(a);
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/enum.js
function isPgEnum(obj) {
  return !!obj && typeof obj === "function" && isPgEnumSym in obj && obj[isPgEnumSym] === true;
}
function pgEnumWithSchema(enumName, values, schema) {
  const enumInstance = Object.assign(
    (name) => new PgEnumColumnBuilder(name ?? "", enumInstance),
    {
      enumName,
      enumValues: values,
      schema,
      [isPgEnumSym]: true
    }
  );
  return enumInstance;
}
function pgEnumObjectWithSchema(enumName, values, schema) {
  const enumInstance = Object.assign(
    (name) => new PgEnumObjectColumnBuilder(name ?? "", enumInstance),
    {
      enumName,
      enumValues: Object.values(values),
      schema,
      [isPgEnumSym]: true
    }
  );
  return enumInstance;
}
var PgEnumObjectColumnBuilder, PgEnumObjectColumn, isPgEnumSym, PgEnumColumnBuilder, PgEnumColumn;
var init_enum = __esm({
  "node_modules/drizzle-orm/pg-core/columns/enum.js"() {
    init_entity();
    init_common();
    PgEnumObjectColumnBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgEnumObjectColumnBuilder";
      constructor(name, enumInstance) {
        super(name, "string", "PgEnumObjectColumn");
        this.config.enum = enumInstance;
      }
      /** @internal */
      build(table) {
        return new PgEnumObjectColumn(
          table,
          this.config
        );
      }
    };
    PgEnumObjectColumn = class extends PgColumn {
      static [entityKind] = "PgEnumObjectColumn";
      enum;
      enumValues = this.config.enum.enumValues;
      constructor(table, config2) {
        super(table, config2);
        this.enum = config2.enum;
      }
      getSQLType() {
        return this.enum.enumName;
      }
    };
    isPgEnumSym = /* @__PURE__ */ Symbol.for("drizzle:isPgEnum");
    PgEnumColumnBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgEnumColumnBuilder";
      constructor(name, enumInstance) {
        super(name, "string", "PgEnumColumn");
        this.config.enum = enumInstance;
      }
      /** @internal */
      build(table) {
        return new PgEnumColumn(
          table,
          this.config
        );
      }
    };
    PgEnumColumn = class extends PgColumn {
      static [entityKind] = "PgEnumColumn";
      enum = this.config.enum;
      enumValues = this.config.enum.enumValues;
      constructor(table, config2) {
        super(table, config2);
        this.enum = config2.enum;
      }
      getSQLType() {
        return this.enum.enumName;
      }
    };
  }
});

// node_modules/drizzle-orm/subquery.js
var Subquery, WithSubquery;
var init_subquery = __esm({
  "node_modules/drizzle-orm/subquery.js"() {
    init_entity();
    Subquery = class {
      static [entityKind] = "Subquery";
      constructor(sql2, fields, alias, isWith = false, usedTables = []) {
        this._ = {
          brand: "Subquery",
          sql: sql2,
          selectedFields: fields,
          alias,
          isWith,
          usedTables
        };
      }
      // getSQL(): SQL<unknown> {
      // 	return new SQL([this]);
      // }
    };
    WithSubquery = class extends Subquery {
      static [entityKind] = "WithSubquery";
    };
  }
});

// node_modules/drizzle-orm/version.js
var version;
var init_version = __esm({
  "node_modules/drizzle-orm/version.js"() {
    version = "0.45.4";
  }
});

// node_modules/drizzle-orm/tracing.js
var otel, rawTracer, tracer;
var init_tracing = __esm({
  "node_modules/drizzle-orm/tracing.js"() {
    init_tracing_utils();
    init_version();
    tracer = {
      startActiveSpan(name, fn) {
        if (!otel) {
          return fn();
        }
        if (!rawTracer) {
          rawTracer = otel.trace.getTracer("drizzle-orm", version);
        }
        return iife(
          (otel2, rawTracer2) => rawTracer2.startActiveSpan(
            name,
            (span) => {
              try {
                return fn(span);
              } catch (e) {
                span.setStatus({
                  code: otel2.SpanStatusCode.ERROR,
                  message: e instanceof Error ? e.message : "Unknown error"
                  // eslint-disable-line no-instanceof/no-instanceof
                });
                throw e;
              } finally {
                span.end();
              }
            }
          ),
          otel,
          rawTracer
        );
      }
    };
  }
});

// node_modules/drizzle-orm/view-common.js
var ViewBaseConfig;
var init_view_common = __esm({
  "node_modules/drizzle-orm/view-common.js"() {
    ViewBaseConfig = /* @__PURE__ */ Symbol.for("drizzle:ViewBaseConfig");
  }
});

// node_modules/drizzle-orm/table.js
function getTableName(table) {
  return table[TableName];
}
function getTableUniqueName(table) {
  return `${table[Schema] ?? "public"}.${table[TableName]}`;
}
var Schema, Columns, ExtraConfigColumns, OriginalName, BaseName, IsAlias, ExtraConfigBuilder, IsDrizzleTable, Table;
var init_table = __esm({
  "node_modules/drizzle-orm/table.js"() {
    init_entity();
    init_table_utils();
    Schema = /* @__PURE__ */ Symbol.for("drizzle:Schema");
    Columns = /* @__PURE__ */ Symbol.for("drizzle:Columns");
    ExtraConfigColumns = /* @__PURE__ */ Symbol.for("drizzle:ExtraConfigColumns");
    OriginalName = /* @__PURE__ */ Symbol.for("drizzle:OriginalName");
    BaseName = /* @__PURE__ */ Symbol.for("drizzle:BaseName");
    IsAlias = /* @__PURE__ */ Symbol.for("drizzle:IsAlias");
    ExtraConfigBuilder = /* @__PURE__ */ Symbol.for("drizzle:ExtraConfigBuilder");
    IsDrizzleTable = /* @__PURE__ */ Symbol.for("drizzle:IsDrizzleTable");
    Table = class {
      static [entityKind] = "Table";
      /** @internal */
      static Symbol = {
        Name: TableName,
        Schema,
        OriginalName,
        Columns,
        ExtraConfigColumns,
        BaseName,
        IsAlias,
        ExtraConfigBuilder
      };
      /**
       * @internal
       * Can be changed if the table is aliased.
       */
      [TableName];
      /**
       * @internal
       * Used to store the original name of the table, before any aliasing.
       */
      [OriginalName];
      /** @internal */
      [Schema];
      /** @internal */
      [Columns];
      /** @internal */
      [ExtraConfigColumns];
      /**
       *  @internal
       * Used to store the table name before the transformation via the `tableCreator` functions.
       */
      [BaseName];
      /** @internal */
      [IsAlias] = false;
      /** @internal */
      [IsDrizzleTable] = true;
      /** @internal */
      [ExtraConfigBuilder] = void 0;
      constructor(name, schema, baseName) {
        this[TableName] = this[OriginalName] = name;
        this[Schema] = schema;
        this[BaseName] = baseName;
      }
    };
  }
});

// node_modules/drizzle-orm/sql/sql.js
function isSQLWrapper(value) {
  return value !== null && value !== void 0 && typeof value.getSQL === "function";
}
function mergeQueries(queries) {
  const result = { sql: "", params: [] };
  for (const query of queries) {
    result.sql += query.sql;
    result.params.push(...query.params);
    if (query.typings?.length) {
      if (!result.typings) {
        result.typings = [];
      }
      result.typings.push(...query.typings);
    }
  }
  return result;
}
function isDriverValueEncoder(value) {
  return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
}
function sql(strings, ...params) {
  const queryChunks = [];
  if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
    queryChunks.push(new StringChunk(strings[0]));
  }
  for (const [paramIndex, param2] of params.entries()) {
    queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
  }
  return new SQL(queryChunks);
}
function fillPlaceholders(params, values) {
  return params.map((p) => {
    if (is(p, Placeholder)) {
      if (!(p.name in values)) {
        throw new Error(`No value for placeholder "${p.name}" was provided`);
      }
      return values[p.name];
    }
    if (is(p, Param) && is(p.value, Placeholder)) {
      if (!(p.value.name in values)) {
        throw new Error(`No value for placeholder "${p.value.name}" was provided`);
      }
      return p.encoder.mapToDriverValue(values[p.value.name]);
    }
    return p;
  });
}
var FakePrimitiveParam, StringChunk, SQL, Name, noopDecoder, noopEncoder, noopMapper, Param, Placeholder, IsDrizzleView, View;
var init_sql = __esm({
  "node_modules/drizzle-orm/sql/sql.js"() {
    init_entity();
    init_enum();
    init_subquery();
    init_tracing();
    init_view_common();
    init_column();
    init_table();
    FakePrimitiveParam = class {
      static [entityKind] = "FakePrimitiveParam";
    };
    StringChunk = class {
      static [entityKind] = "StringChunk";
      value;
      constructor(value) {
        this.value = Array.isArray(value) ? value : [value];
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    SQL = class _SQL {
      constructor(queryChunks) {
        this.queryChunks = queryChunks;
        for (const chunk of queryChunks) {
          if (is(chunk, Table)) {
            const schemaName = chunk[Table.Symbol.Schema];
            this.usedTables.push(
              schemaName === void 0 ? chunk[Table.Symbol.Name] : schemaName + "." + chunk[Table.Symbol.Name]
            );
          }
        }
      }
      static [entityKind] = "SQL";
      /** @internal */
      decoder = noopDecoder;
      shouldInlineParams = false;
      /** @internal */
      usedTables = [];
      append(query) {
        this.queryChunks.push(...query.queryChunks);
        return this;
      }
      toQuery(config2) {
        return tracer.startActiveSpan("drizzle.buildSQL", (span) => {
          const query = this.buildQueryFromSourceParams(this.queryChunks, config2);
          span?.setAttributes({
            "drizzle.query.text": query.sql,
            "drizzle.query.params": JSON.stringify(query.params)
          });
          return query;
        });
      }
      buildQueryFromSourceParams(chunks, _config) {
        const config2 = Object.assign({}, _config, {
          inlineParams: _config.inlineParams || this.shouldInlineParams,
          paramStartIndex: _config.paramStartIndex || { value: 0 }
        });
        const {
          casing,
          escapeName,
          escapeParam,
          prepareTyping,
          inlineParams,
          paramStartIndex
        } = config2;
        return mergeQueries(chunks.map((chunk) => {
          if (is(chunk, StringChunk)) {
            return { sql: chunk.value.join(""), params: [] };
          }
          if (is(chunk, Name)) {
            return { sql: escapeName(chunk.value), params: [] };
          }
          if (chunk === void 0) {
            return { sql: "", params: [] };
          }
          if (Array.isArray(chunk)) {
            const result = [new StringChunk("(")];
            for (const [i, p] of chunk.entries()) {
              result.push(p);
              if (i < chunk.length - 1) {
                result.push(new StringChunk(", "));
              }
            }
            result.push(new StringChunk(")"));
            return this.buildQueryFromSourceParams(result, config2);
          }
          if (is(chunk, _SQL)) {
            return this.buildQueryFromSourceParams(chunk.queryChunks, {
              ...config2,
              inlineParams: inlineParams || chunk.shouldInlineParams
            });
          }
          if (is(chunk, Table)) {
            const schemaName = chunk[Table.Symbol.Schema];
            const tableName = chunk[Table.Symbol.Name];
            return {
              sql: schemaName === void 0 || chunk[IsAlias] ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
              params: []
            };
          }
          if (is(chunk, Column)) {
            const columnName = casing.getColumnCasing(chunk);
            if (_config.invokeSource === "indexes") {
              return { sql: escapeName(columnName), params: [] };
            }
            const schemaName = chunk.table[Table.Symbol.Schema];
            return {
              sql: chunk.table[IsAlias] || schemaName === void 0 ? escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName) : escapeName(schemaName) + "." + escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName),
              params: []
            };
          }
          if (is(chunk, View)) {
            const schemaName = chunk[ViewBaseConfig].schema;
            const viewName = chunk[ViewBaseConfig].name;
            return {
              sql: schemaName === void 0 || chunk[ViewBaseConfig].isAlias ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
              params: []
            };
          }
          if (is(chunk, Param)) {
            if (is(chunk.value, Placeholder)) {
              return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
            }
            const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
            if (is(mappedValue, _SQL)) {
              return this.buildQueryFromSourceParams([mappedValue], config2);
            }
            if (inlineParams) {
              return { sql: this.mapInlineParam(mappedValue, config2), params: [] };
            }
            let typings = ["none"];
            if (prepareTyping) {
              typings = [prepareTyping(chunk.encoder)];
            }
            return { sql: escapeParam(paramStartIndex.value++, mappedValue), params: [mappedValue], typings };
          }
          if (is(chunk, Placeholder)) {
            return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
          }
          if (is(chunk, _SQL.Aliased) && chunk.fieldAlias !== void 0) {
            return { sql: escapeName(chunk.fieldAlias), params: [] };
          }
          if (is(chunk, Subquery)) {
            if (chunk._.isWith) {
              return { sql: escapeName(chunk._.alias), params: [] };
            }
            return this.buildQueryFromSourceParams([
              new StringChunk("("),
              chunk._.sql,
              new StringChunk(") "),
              new Name(chunk._.alias)
            ], config2);
          }
          if (isPgEnum(chunk)) {
            if (chunk.schema) {
              return { sql: escapeName(chunk.schema) + "." + escapeName(chunk.enumName), params: [] };
            }
            return { sql: escapeName(chunk.enumName), params: [] };
          }
          if (isSQLWrapper(chunk)) {
            if (chunk.shouldOmitSQLParens?.()) {
              return this.buildQueryFromSourceParams([chunk.getSQL()], config2);
            }
            return this.buildQueryFromSourceParams([
              new StringChunk("("),
              chunk.getSQL(),
              new StringChunk(")")
            ], config2);
          }
          if (inlineParams) {
            return { sql: this.mapInlineParam(chunk, config2), params: [] };
          }
          return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
        }));
      }
      mapInlineParam(chunk, { escapeString }) {
        if (chunk === null) {
          return "null";
        }
        if (typeof chunk === "number" || typeof chunk === "boolean") {
          return chunk.toString();
        }
        if (typeof chunk === "string") {
          return escapeString(chunk);
        }
        if (typeof chunk === "object") {
          const mappedValueAsString = chunk.toString();
          if (mappedValueAsString === "[object Object]") {
            return escapeString(JSON.stringify(chunk));
          }
          return escapeString(mappedValueAsString);
        }
        throw new Error("Unexpected param value: " + chunk);
      }
      getSQL() {
        return this;
      }
      as(alias) {
        if (alias === void 0) {
          return this;
        }
        return new _SQL.Aliased(this, alias);
      }
      mapWith(decoder) {
        this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
        return this;
      }
      inlineParams() {
        this.shouldInlineParams = true;
        return this;
      }
      /**
       * This method is used to conditionally include a part of the query.
       *
       * @param condition - Condition to check
       * @returns itself if the condition is `true`, otherwise `undefined`
       */
      if(condition) {
        return condition ? this : void 0;
      }
    };
    Name = class {
      constructor(value) {
        this.value = value;
      }
      static [entityKind] = "Name";
      brand;
      getSQL() {
        return new SQL([this]);
      }
    };
    noopDecoder = {
      mapFromDriverValue: (value) => value
    };
    noopEncoder = {
      mapToDriverValue: (value) => value
    };
    noopMapper = {
      ...noopDecoder,
      ...noopEncoder
    };
    Param = class {
      /**
       * @param value - Parameter value
       * @param encoder - Encoder to convert the value to a driver parameter
       */
      constructor(value, encoder = noopEncoder) {
        this.value = value;
        this.encoder = encoder;
      }
      static [entityKind] = "Param";
      brand;
      getSQL() {
        return new SQL([this]);
      }
    };
    ((sql2) => {
      function empty() {
        return new SQL([]);
      }
      sql2.empty = empty;
      function fromList(list) {
        return new SQL(list);
      }
      sql2.fromList = fromList;
      function raw(str) {
        return new SQL([new StringChunk(str)]);
      }
      sql2.raw = raw;
      function join(chunks, separator) {
        const result = [];
        for (const [i, chunk] of chunks.entries()) {
          if (i > 0 && separator !== void 0) {
            result.push(separator);
          }
          result.push(chunk);
        }
        return new SQL(result);
      }
      sql2.join = join;
      function identifier(value) {
        return new Name(value);
      }
      sql2.identifier = identifier;
      function placeholder2(name2) {
        return new Placeholder(name2);
      }
      sql2.placeholder = placeholder2;
      function param2(value, encoder) {
        return new Param(value, encoder);
      }
      sql2.param = param2;
    })(sql || (sql = {}));
    ((SQL2) => {
      class Aliased {
        constructor(sql2, fieldAlias) {
          this.sql = sql2;
          this.fieldAlias = fieldAlias;
        }
        static [entityKind] = "SQL.Aliased";
        /** @internal */
        isSelectionField = false;
        getSQL() {
          return this.sql;
        }
        /** @internal */
        clone() {
          return new Aliased(this.sql, this.fieldAlias);
        }
      }
      SQL2.Aliased = Aliased;
    })(SQL || (SQL = {}));
    Placeholder = class {
      constructor(name2) {
        this.name = name2;
      }
      static [entityKind] = "Placeholder";
      getSQL() {
        return new SQL([this]);
      }
    };
    IsDrizzleView = /* @__PURE__ */ Symbol.for("drizzle:IsDrizzleView");
    View = class {
      static [entityKind] = "View";
      /** @internal */
      [ViewBaseConfig];
      /** @internal */
      [IsDrizzleView] = true;
      constructor({ name: name2, schema, selectedFields, query }) {
        this[ViewBaseConfig] = {
          name: name2,
          originalName: name2,
          schema,
          selectedFields,
          query,
          isExisting: !query,
          isAlias: false
        };
      }
      getSQL() {
        return new SQL([this]);
      }
    };
    Column.prototype.getSQL = function() {
      return new SQL([this]);
    };
    Table.prototype.getSQL = function() {
      return new SQL([this]);
    };
    Subquery.prototype.getSQL = function() {
      return new SQL([this]);
    };
  }
});

// node_modules/drizzle-orm/alias.js
function aliasedTable(table, tableAlias) {
  return new Proxy(table, new TableAliasProxyHandler(tableAlias, false));
}
function aliasedTableColumn(column, tableAlias) {
  return new Proxy(
    column,
    new ColumnAliasProxyHandler(new Proxy(column.table, new TableAliasProxyHandler(tableAlias, false)))
  );
}
function mapColumnsInAliasedSQLToAlias(query, alias) {
  return new SQL.Aliased(mapColumnsInSQLToAlias(query.sql, alias), query.fieldAlias);
}
function mapColumnsInSQLToAlias(query, alias) {
  return sql.join(query.queryChunks.map((c) => {
    if (is(c, Column)) {
      return aliasedTableColumn(c, alias);
    }
    if (is(c, SQL)) {
      return mapColumnsInSQLToAlias(c, alias);
    }
    if (is(c, SQL.Aliased)) {
      return mapColumnsInAliasedSQLToAlias(c, alias);
    }
    return c;
  }));
}
var ColumnAliasProxyHandler, TableAliasProxyHandler, RelationTableAliasProxyHandler;
var init_alias = __esm({
  "node_modules/drizzle-orm/alias.js"() {
    init_column();
    init_entity();
    init_sql();
    init_table();
    init_view_common();
    ColumnAliasProxyHandler = class {
      constructor(table) {
        this.table = table;
      }
      static [entityKind] = "ColumnAliasProxyHandler";
      get(columnObj, prop) {
        if (prop === "table") {
          return this.table;
        }
        return columnObj[prop];
      }
    };
    TableAliasProxyHandler = class {
      constructor(alias, replaceOriginalName) {
        this.alias = alias;
        this.replaceOriginalName = replaceOriginalName;
      }
      static [entityKind] = "TableAliasProxyHandler";
      get(target, prop) {
        if (prop === Table.Symbol.IsAlias) {
          return true;
        }
        if (prop === Table.Symbol.Name) {
          return this.alias;
        }
        if (this.replaceOriginalName && prop === Table.Symbol.OriginalName) {
          return this.alias;
        }
        if (prop === ViewBaseConfig) {
          return {
            ...target[ViewBaseConfig],
            name: this.alias,
            isAlias: true
          };
        }
        if (prop === Table.Symbol.Columns) {
          const columns = target[Table.Symbol.Columns];
          if (!columns) {
            return columns;
          }
          const proxiedColumns = {};
          Object.keys(columns).map((key) => {
            proxiedColumns[key] = new Proxy(
              columns[key],
              new ColumnAliasProxyHandler(new Proxy(target, this))
            );
          });
          return proxiedColumns;
        }
        const value = target[prop];
        if (is(value, Column)) {
          return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(target, this)));
        }
        return value;
      }
    };
    RelationTableAliasProxyHandler = class {
      constructor(alias) {
        this.alias = alias;
      }
      static [entityKind] = "RelationTableAliasProxyHandler";
      get(target, prop) {
        if (prop === "sourceTable") {
          return aliasedTable(target.sourceTable, this.alias);
        }
        return target[prop];
      }
    };
  }
});

// node_modules/drizzle-orm/errors.js
var DrizzleError, DrizzleQueryError, TransactionRollbackError;
var init_errors = __esm({
  "node_modules/drizzle-orm/errors.js"() {
    init_entity();
    DrizzleError = class extends Error {
      static [entityKind] = "DrizzleError";
      constructor({ message, cause }) {
        super(message);
        this.name = "DrizzleError";
        this.cause = cause;
      }
    };
    DrizzleQueryError = class _DrizzleQueryError extends Error {
      constructor(query, params, cause) {
        super(`Failed query: ${query}
params: ${params}`);
        this.query = query;
        this.params = params;
        this.cause = cause;
        Error.captureStackTrace(this, _DrizzleQueryError);
        if (cause) this.cause = cause;
      }
    };
    TransactionRollbackError = class extends DrizzleError {
      static [entityKind] = "TransactionRollbackError";
      constructor() {
        super({ message: "Rollback" });
      }
    };
  }
});

// node_modules/drizzle-orm/logger.js
var ConsoleLogWriter, DefaultLogger, NoopLogger;
var init_logger = __esm({
  "node_modules/drizzle-orm/logger.js"() {
    init_entity();
    ConsoleLogWriter = class {
      static [entityKind] = "ConsoleLogWriter";
      write(message) {
        console.log(message);
      }
    };
    DefaultLogger = class {
      static [entityKind] = "DefaultLogger";
      writer;
      constructor(config2) {
        this.writer = config2?.writer ?? new ConsoleLogWriter();
      }
      logQuery(query, params) {
        const stringifiedParams = params.map((p) => {
          try {
            return JSON.stringify(p);
          } catch {
            return String(p);
          }
        });
        const paramsStr = stringifiedParams.length ? ` -- params: [${stringifiedParams.join(", ")}]` : "";
        this.writer.write(`Query: ${query}${paramsStr}`);
      }
    };
    NoopLogger = class {
      static [entityKind] = "NoopLogger";
      logQuery() {
      }
    };
  }
});

// node_modules/drizzle-orm/operations.js
var init_operations = __esm({
  "node_modules/drizzle-orm/operations.js"() {
  }
});

// node_modules/drizzle-orm/query-promise.js
var QueryPromise;
var init_query_promise = __esm({
  "node_modules/drizzle-orm/query-promise.js"() {
    init_entity();
    QueryPromise = class {
      static [entityKind] = "QueryPromise";
      [Symbol.toStringTag] = "QueryPromise";
      catch(onRejected) {
        return this.then(void 0, onRejected);
      }
      finally(onFinally) {
        return this.then(
          (value) => {
            onFinally?.();
            return value;
          },
          (reason) => {
            onFinally?.();
            throw reason;
          }
        );
      }
      then(onFulfilled, onRejected) {
        return this.execute().then(onFulfilled, onRejected);
      }
    };
  }
});

// node_modules/drizzle-orm/utils.js
function mapResultRow(columns, row, joinsNotNullableMap) {
  const nullifyMap = {};
  const result = columns.reduce(
    (result2, { path, field }, columnIndex) => {
      let decoder;
      if (is(field, Column)) {
        decoder = field;
      } else if (is(field, SQL)) {
        decoder = field.decoder;
      } else if (is(field, Subquery)) {
        decoder = field._.sql.decoder;
      } else {
        decoder = field.sql.decoder;
      }
      let node = result2;
      for (const [pathChunkIndex, pathChunk] of path.entries()) {
        if (pathChunkIndex < path.length - 1) {
          if (!(pathChunk in node)) {
            node[pathChunk] = {};
          }
          node = node[pathChunk];
        } else {
          const rawValue = row[columnIndex];
          const value = node[pathChunk] = rawValue === null ? null : decoder.mapFromDriverValue(rawValue);
          if (joinsNotNullableMap && is(field, Column) && path.length === 2) {
            const objectName = path[0];
            if (!(objectName in nullifyMap)) {
              nullifyMap[objectName] = value === null ? getTableName(field.table) : false;
            } else if (typeof nullifyMap[objectName] === "string" && nullifyMap[objectName] !== getTableName(field.table)) {
              nullifyMap[objectName] = false;
            }
          }
        }
      }
      return result2;
    },
    {}
  );
  if (joinsNotNullableMap && Object.keys(nullifyMap).length > 0) {
    for (const [objectName, tableName] of Object.entries(nullifyMap)) {
      if (typeof tableName === "string" && !joinsNotNullableMap[tableName]) {
        result[objectName] = null;
      }
    }
  }
  return result;
}
function orderSelectedFields(fields, pathPrefix) {
  return Object.entries(fields).reduce((result, [name, field]) => {
    if (typeof name !== "string") {
      return result;
    }
    const newPath = pathPrefix ? [...pathPrefix, name] : [name];
    if (is(field, Column) || is(field, SQL) || is(field, SQL.Aliased) || is(field, Subquery)) {
      result.push({ path: newPath, field });
    } else if (is(field, Table)) {
      result.push(...orderSelectedFields(field[Table.Symbol.Columns], newPath));
    } else {
      result.push(...orderSelectedFields(field, newPath));
    }
    return result;
  }, []);
}
function haveSameKeys(left, right) {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }
  for (const [index2, key] of leftKeys.entries()) {
    if (key !== rightKeys[index2]) {
      return false;
    }
  }
  return true;
}
function mapUpdateSet(table, values) {
  const entries = Object.entries(values).filter(([, value]) => value !== void 0).map(([key, value]) => {
    if (is(value, SQL) || is(value, Column)) {
      return [key, value];
    } else {
      return [key, new Param(value, table[Table.Symbol.Columns][key])];
    }
  });
  if (entries.length === 0) {
    throw new Error("No values to set");
  }
  return Object.fromEntries(entries);
}
function applyMixins(baseClass, extendedClasses) {
  for (const extendedClass of extendedClasses) {
    for (const name of Object.getOwnPropertyNames(extendedClass.prototype)) {
      if (name === "constructor") continue;
      Object.defineProperty(
        baseClass.prototype,
        name,
        Object.getOwnPropertyDescriptor(extendedClass.prototype, name) || /* @__PURE__ */ Object.create(null)
      );
    }
  }
}
function getTableColumns(table) {
  return table[Table.Symbol.Columns];
}
function getTableLikeName(table) {
  return is(table, Subquery) ? table._.alias : is(table, View) ? table[ViewBaseConfig].name : is(table, SQL) ? void 0 : table[Table.Symbol.IsAlias] ? table[Table.Symbol.Name] : table[Table.Symbol.BaseName];
}
function getColumnNameAndConfig(a, b) {
  return {
    name: typeof a === "string" && a.length > 0 ? a : "",
    config: typeof a === "object" ? a : b
  };
}
function isConfig(data) {
  if (typeof data !== "object" || data === null) return false;
  if (data.constructor.name !== "Object") return false;
  if ("logger" in data) {
    const type = typeof data["logger"];
    if (type !== "boolean" && (type !== "object" || typeof data["logger"]["logQuery"] !== "function") && type !== "undefined") return false;
    return true;
  }
  if ("schema" in data) {
    const type = typeof data["schema"];
    if (type !== "object" && type !== "undefined") return false;
    return true;
  }
  if ("casing" in data) {
    const type = typeof data["casing"];
    if (type !== "string" && type !== "undefined") return false;
    return true;
  }
  if ("mode" in data) {
    if (data["mode"] !== "default" || data["mode"] !== "planetscale" || data["mode"] !== void 0) return false;
    return true;
  }
  if ("connection" in data) {
    const type = typeof data["connection"];
    if (type !== "string" && type !== "object" && type !== "undefined") return false;
    return true;
  }
  if ("client" in data) {
    const type = typeof data["client"];
    if (type !== "object" && type !== "function" && type !== "undefined") return false;
    return true;
  }
  if (Object.keys(data).length === 0) return true;
  return false;
}
var textDecoder;
var init_utils = __esm({
  "node_modules/drizzle-orm/utils.js"() {
    init_column();
    init_entity();
    init_sql();
    init_subquery();
    init_table();
    init_view_common();
    textDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder();
  }
});

// node_modules/drizzle-orm/pg-core/columns/int.common.js
var PgIntColumnBaseBuilder;
var init_int_common = __esm({
  "node_modules/drizzle-orm/pg-core/columns/int.common.js"() {
    init_entity();
    init_common();
    PgIntColumnBaseBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgIntColumnBaseBuilder";
      generatedAlwaysAsIdentity(sequence) {
        if (sequence) {
          const { name, ...options } = sequence;
          this.config.generatedIdentity = {
            type: "always",
            sequenceName: name,
            sequenceOptions: options
          };
        } else {
          this.config.generatedIdentity = {
            type: "always"
          };
        }
        this.config.hasDefault = true;
        this.config.notNull = true;
        return this;
      }
      generatedByDefaultAsIdentity(sequence) {
        if (sequence) {
          const { name, ...options } = sequence;
          this.config.generatedIdentity = {
            type: "byDefault",
            sequenceName: name,
            sequenceOptions: options
          };
        } else {
          this.config.generatedIdentity = {
            type: "byDefault"
          };
        }
        this.config.hasDefault = true;
        this.config.notNull = true;
        return this;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/bigint.js
function bigint(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  if (config2.mode === "number") {
    return new PgBigInt53Builder(name);
  }
  return new PgBigInt64Builder(name);
}
var PgBigInt53Builder, PgBigInt53, PgBigInt64Builder, PgBigInt64;
var init_bigint = __esm({
  "node_modules/drizzle-orm/pg-core/columns/bigint.js"() {
    init_entity();
    init_utils();
    init_common();
    init_int_common();
    PgBigInt53Builder = class extends PgIntColumnBaseBuilder {
      static [entityKind] = "PgBigInt53Builder";
      constructor(name) {
        super(name, "number", "PgBigInt53");
      }
      /** @internal */
      build(table) {
        return new PgBigInt53(table, this.config);
      }
    };
    PgBigInt53 = class extends PgColumn {
      static [entityKind] = "PgBigInt53";
      getSQLType() {
        return "bigint";
      }
      mapFromDriverValue(value) {
        if (typeof value === "number") {
          return value;
        }
        return Number(value);
      }
    };
    PgBigInt64Builder = class extends PgIntColumnBaseBuilder {
      static [entityKind] = "PgBigInt64Builder";
      constructor(name) {
        super(name, "bigint", "PgBigInt64");
      }
      /** @internal */
      build(table) {
        return new PgBigInt64(
          table,
          this.config
        );
      }
    };
    PgBigInt64 = class extends PgColumn {
      static [entityKind] = "PgBigInt64";
      getSQLType() {
        return "bigint";
      }
      // eslint-disable-next-line unicorn/prefer-native-coercion-functions
      mapFromDriverValue(value) {
        return BigInt(value);
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/bigserial.js
function bigserial(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  if (config2.mode === "number") {
    return new PgBigSerial53Builder(name);
  }
  return new PgBigSerial64Builder(name);
}
var PgBigSerial53Builder, PgBigSerial53, PgBigSerial64Builder, PgBigSerial64;
var init_bigserial = __esm({
  "node_modules/drizzle-orm/pg-core/columns/bigserial.js"() {
    init_entity();
    init_utils();
    init_common();
    PgBigSerial53Builder = class extends PgColumnBuilder {
      static [entityKind] = "PgBigSerial53Builder";
      constructor(name) {
        super(name, "number", "PgBigSerial53");
        this.config.hasDefault = true;
        this.config.notNull = true;
      }
      /** @internal */
      build(table) {
        return new PgBigSerial53(
          table,
          this.config
        );
      }
    };
    PgBigSerial53 = class extends PgColumn {
      static [entityKind] = "PgBigSerial53";
      getSQLType() {
        return "bigserial";
      }
      mapFromDriverValue(value) {
        if (typeof value === "number") {
          return value;
        }
        return Number(value);
      }
    };
    PgBigSerial64Builder = class extends PgColumnBuilder {
      static [entityKind] = "PgBigSerial64Builder";
      constructor(name) {
        super(name, "bigint", "PgBigSerial64");
        this.config.hasDefault = true;
      }
      /** @internal */
      build(table) {
        return new PgBigSerial64(
          table,
          this.config
        );
      }
    };
    PgBigSerial64 = class extends PgColumn {
      static [entityKind] = "PgBigSerial64";
      getSQLType() {
        return "bigserial";
      }
      // eslint-disable-next-line unicorn/prefer-native-coercion-functions
      mapFromDriverValue(value) {
        return BigInt(value);
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/boolean.js
function boolean(name) {
  return new PgBooleanBuilder(name ?? "");
}
var PgBooleanBuilder, PgBoolean;
var init_boolean = __esm({
  "node_modules/drizzle-orm/pg-core/columns/boolean.js"() {
    init_entity();
    init_common();
    PgBooleanBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgBooleanBuilder";
      constructor(name) {
        super(name, "boolean", "PgBoolean");
      }
      /** @internal */
      build(table) {
        return new PgBoolean(table, this.config);
      }
    };
    PgBoolean = class extends PgColumn {
      static [entityKind] = "PgBoolean";
      getSQLType() {
        return "boolean";
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/char.js
function char(a, b = {}) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgCharBuilder(name, config2);
}
var PgCharBuilder, PgChar;
var init_char = __esm({
  "node_modules/drizzle-orm/pg-core/columns/char.js"() {
    init_entity();
    init_utils();
    init_common();
    PgCharBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgCharBuilder";
      constructor(name, config2) {
        super(name, "string", "PgChar");
        this.config.length = config2.length;
        this.config.enumValues = config2.enum;
      }
      /** @internal */
      build(table) {
        return new PgChar(
          table,
          this.config
        );
      }
    };
    PgChar = class extends PgColumn {
      static [entityKind] = "PgChar";
      length = this.config.length;
      enumValues = this.config.enumValues;
      getSQLType() {
        return this.length === void 0 ? `char` : `char(${this.length})`;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/cidr.js
function cidr(name) {
  return new PgCidrBuilder(name ?? "");
}
var PgCidrBuilder, PgCidr;
var init_cidr = __esm({
  "node_modules/drizzle-orm/pg-core/columns/cidr.js"() {
    init_entity();
    init_common();
    PgCidrBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgCidrBuilder";
      constructor(name) {
        super(name, "string", "PgCidr");
      }
      /** @internal */
      build(table) {
        return new PgCidr(table, this.config);
      }
    };
    PgCidr = class extends PgColumn {
      static [entityKind] = "PgCidr";
      getSQLType() {
        return "cidr";
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/custom.js
function customType(customTypeParams) {
  return (a, b) => {
    const { name, config: config2 } = getColumnNameAndConfig(a, b);
    return new PgCustomColumnBuilder(name, config2, customTypeParams);
  };
}
var PgCustomColumnBuilder, PgCustomColumn;
var init_custom = __esm({
  "node_modules/drizzle-orm/pg-core/columns/custom.js"() {
    init_entity();
    init_utils();
    init_common();
    PgCustomColumnBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgCustomColumnBuilder";
      constructor(name, fieldConfig, customTypeParams) {
        super(name, "custom", "PgCustomColumn");
        this.config.fieldConfig = fieldConfig;
        this.config.customTypeParams = customTypeParams;
      }
      /** @internal */
      build(table) {
        return new PgCustomColumn(
          table,
          this.config
        );
      }
    };
    PgCustomColumn = class extends PgColumn {
      static [entityKind] = "PgCustomColumn";
      sqlName;
      mapTo;
      mapFrom;
      constructor(table, config2) {
        super(table, config2);
        this.sqlName = config2.customTypeParams.dataType(config2.fieldConfig);
        this.mapTo = config2.customTypeParams.toDriver;
        this.mapFrom = config2.customTypeParams.fromDriver;
      }
      getSQLType() {
        return this.sqlName;
      }
      mapFromDriverValue(value) {
        return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
      }
      mapToDriverValue(value) {
        return typeof this.mapTo === "function" ? this.mapTo(value) : value;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/date.common.js
var PgDateColumnBaseBuilder;
var init_date_common = __esm({
  "node_modules/drizzle-orm/pg-core/columns/date.common.js"() {
    init_entity();
    init_sql();
    init_common();
    PgDateColumnBaseBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgDateColumnBaseBuilder";
      defaultNow() {
        return this.default(sql`now()`);
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/date.js
function date(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  if (config2?.mode === "date") {
    return new PgDateBuilder(name);
  }
  return new PgDateStringBuilder(name);
}
var PgDateBuilder, PgDate, PgDateStringBuilder, PgDateString;
var init_date = __esm({
  "node_modules/drizzle-orm/pg-core/columns/date.js"() {
    init_entity();
    init_utils();
    init_common();
    init_date_common();
    PgDateBuilder = class extends PgDateColumnBaseBuilder {
      static [entityKind] = "PgDateBuilder";
      constructor(name) {
        super(name, "date", "PgDate");
      }
      /** @internal */
      build(table) {
        return new PgDate(table, this.config);
      }
    };
    PgDate = class extends PgColumn {
      static [entityKind] = "PgDate";
      getSQLType() {
        return "date";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") return new Date(value);
        return value;
      }
      mapToDriverValue(value) {
        return value.toISOString();
      }
    };
    PgDateStringBuilder = class extends PgDateColumnBaseBuilder {
      static [entityKind] = "PgDateStringBuilder";
      constructor(name) {
        super(name, "string", "PgDateString");
      }
      /** @internal */
      build(table) {
        return new PgDateString(
          table,
          this.config
        );
      }
    };
    PgDateString = class extends PgColumn {
      static [entityKind] = "PgDateString";
      getSQLType() {
        return "date";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") return value;
        return value.toISOString().slice(0, -14);
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/double-precision.js
function doublePrecision(name) {
  return new PgDoublePrecisionBuilder(name ?? "");
}
var PgDoublePrecisionBuilder, PgDoublePrecision;
var init_double_precision = __esm({
  "node_modules/drizzle-orm/pg-core/columns/double-precision.js"() {
    init_entity();
    init_common();
    PgDoublePrecisionBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgDoublePrecisionBuilder";
      constructor(name) {
        super(name, "number", "PgDoublePrecision");
      }
      /** @internal */
      build(table) {
        return new PgDoublePrecision(
          table,
          this.config
        );
      }
    };
    PgDoublePrecision = class extends PgColumn {
      static [entityKind] = "PgDoublePrecision";
      getSQLType() {
        return "double precision";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          return Number.parseFloat(value);
        }
        return value;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/inet.js
function inet(name) {
  return new PgInetBuilder(name ?? "");
}
var PgInetBuilder, PgInet;
var init_inet = __esm({
  "node_modules/drizzle-orm/pg-core/columns/inet.js"() {
    init_entity();
    init_common();
    PgInetBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgInetBuilder";
      constructor(name) {
        super(name, "string", "PgInet");
      }
      /** @internal */
      build(table) {
        return new PgInet(table, this.config);
      }
    };
    PgInet = class extends PgColumn {
      static [entityKind] = "PgInet";
      getSQLType() {
        return "inet";
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/integer.js
function integer(name) {
  return new PgIntegerBuilder(name ?? "");
}
var PgIntegerBuilder, PgInteger;
var init_integer = __esm({
  "node_modules/drizzle-orm/pg-core/columns/integer.js"() {
    init_entity();
    init_common();
    init_int_common();
    PgIntegerBuilder = class extends PgIntColumnBaseBuilder {
      static [entityKind] = "PgIntegerBuilder";
      constructor(name) {
        super(name, "number", "PgInteger");
      }
      /** @internal */
      build(table) {
        return new PgInteger(table, this.config);
      }
    };
    PgInteger = class extends PgColumn {
      static [entityKind] = "PgInteger";
      getSQLType() {
        return "integer";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          return Number.parseInt(value);
        }
        return value;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/interval.js
function interval(a, b = {}) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgIntervalBuilder(name, config2);
}
var PgIntervalBuilder, PgInterval;
var init_interval = __esm({
  "node_modules/drizzle-orm/pg-core/columns/interval.js"() {
    init_entity();
    init_utils();
    init_common();
    PgIntervalBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgIntervalBuilder";
      constructor(name, intervalConfig) {
        super(name, "string", "PgInterval");
        this.config.intervalConfig = intervalConfig;
      }
      /** @internal */
      build(table) {
        return new PgInterval(table, this.config);
      }
    };
    PgInterval = class extends PgColumn {
      static [entityKind] = "PgInterval";
      fields = this.config.intervalConfig.fields;
      precision = this.config.intervalConfig.precision;
      getSQLType() {
        const fields = this.fields ? ` ${this.fields}` : "";
        const precision = this.precision ? `(${this.precision})` : "";
        return `interval${fields}${precision}`;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/json.js
function json2(name) {
  return new PgJsonBuilder(name ?? "");
}
var PgJsonBuilder, PgJson;
var init_json = __esm({
  "node_modules/drizzle-orm/pg-core/columns/json.js"() {
    init_entity();
    init_common();
    PgJsonBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgJsonBuilder";
      constructor(name) {
        super(name, "json", "PgJson");
      }
      /** @internal */
      build(table) {
        return new PgJson(table, this.config);
      }
    };
    PgJson = class extends PgColumn {
      static [entityKind] = "PgJson";
      constructor(table, config2) {
        super(table, config2);
      }
      getSQLType() {
        return "json";
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
        return value;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/jsonb.js
function jsonb(name) {
  return new PgJsonbBuilder(name ?? "");
}
var PgJsonbBuilder, PgJsonb;
var init_jsonb = __esm({
  "node_modules/drizzle-orm/pg-core/columns/jsonb.js"() {
    init_entity();
    init_common();
    PgJsonbBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgJsonbBuilder";
      constructor(name) {
        super(name, "json", "PgJsonb");
      }
      /** @internal */
      build(table) {
        return new PgJsonb(table, this.config);
      }
    };
    PgJsonb = class extends PgColumn {
      static [entityKind] = "PgJsonb";
      constructor(table, config2) {
        super(table, config2);
      }
      getSQLType() {
        return "jsonb";
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
        return value;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/line.js
function line(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  if (!config2?.mode || config2.mode === "tuple") {
    return new PgLineBuilder(name);
  }
  return new PgLineABCBuilder(name);
}
var PgLineBuilder, PgLineTuple, PgLineABCBuilder, PgLineABC;
var init_line = __esm({
  "node_modules/drizzle-orm/pg-core/columns/line.js"() {
    init_entity();
    init_utils();
    init_common();
    PgLineBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgLineBuilder";
      constructor(name) {
        super(name, "array", "PgLine");
      }
      /** @internal */
      build(table) {
        return new PgLineTuple(
          table,
          this.config
        );
      }
    };
    PgLineTuple = class extends PgColumn {
      static [entityKind] = "PgLine";
      getSQLType() {
        return "line";
      }
      mapFromDriverValue(value) {
        const [a, b, c] = value.slice(1, -1).split(",");
        return [Number.parseFloat(a), Number.parseFloat(b), Number.parseFloat(c)];
      }
      mapToDriverValue(value) {
        return `{${value[0]},${value[1]},${value[2]}}`;
      }
    };
    PgLineABCBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgLineABCBuilder";
      constructor(name) {
        super(name, "json", "PgLineABC");
      }
      /** @internal */
      build(table) {
        return new PgLineABC(
          table,
          this.config
        );
      }
    };
    PgLineABC = class extends PgColumn {
      static [entityKind] = "PgLineABC";
      getSQLType() {
        return "line";
      }
      mapFromDriverValue(value) {
        const [a, b, c] = value.slice(1, -1).split(",");
        return { a: Number.parseFloat(a), b: Number.parseFloat(b), c: Number.parseFloat(c) };
      }
      mapToDriverValue(value) {
        return `{${value.a},${value.b},${value.c}}`;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/macaddr.js
function macaddr(name) {
  return new PgMacaddrBuilder(name ?? "");
}
var PgMacaddrBuilder, PgMacaddr;
var init_macaddr = __esm({
  "node_modules/drizzle-orm/pg-core/columns/macaddr.js"() {
    init_entity();
    init_common();
    PgMacaddrBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgMacaddrBuilder";
      constructor(name) {
        super(name, "string", "PgMacaddr");
      }
      /** @internal */
      build(table) {
        return new PgMacaddr(table, this.config);
      }
    };
    PgMacaddr = class extends PgColumn {
      static [entityKind] = "PgMacaddr";
      getSQLType() {
        return "macaddr";
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/macaddr8.js
function macaddr8(name) {
  return new PgMacaddr8Builder(name ?? "");
}
var PgMacaddr8Builder, PgMacaddr8;
var init_macaddr8 = __esm({
  "node_modules/drizzle-orm/pg-core/columns/macaddr8.js"() {
    init_entity();
    init_common();
    PgMacaddr8Builder = class extends PgColumnBuilder {
      static [entityKind] = "PgMacaddr8Builder";
      constructor(name) {
        super(name, "string", "PgMacaddr8");
      }
      /** @internal */
      build(table) {
        return new PgMacaddr8(table, this.config);
      }
    };
    PgMacaddr8 = class extends PgColumn {
      static [entityKind] = "PgMacaddr8";
      getSQLType() {
        return "macaddr8";
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/numeric.js
function numeric(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  const mode = config2?.mode;
  return mode === "number" ? new PgNumericNumberBuilder(name, config2?.precision, config2?.scale) : mode === "bigint" ? new PgNumericBigIntBuilder(name, config2?.precision, config2?.scale) : new PgNumericBuilder(name, config2?.precision, config2?.scale);
}
var PgNumericBuilder, PgNumeric, PgNumericNumberBuilder, PgNumericNumber, PgNumericBigIntBuilder, PgNumericBigInt;
var init_numeric = __esm({
  "node_modules/drizzle-orm/pg-core/columns/numeric.js"() {
    init_entity();
    init_utils();
    init_common();
    PgNumericBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgNumericBuilder";
      constructor(name, precision, scale) {
        super(name, "string", "PgNumeric");
        this.config.precision = precision;
        this.config.scale = scale;
      }
      /** @internal */
      build(table) {
        return new PgNumeric(table, this.config);
      }
    };
    PgNumeric = class extends PgColumn {
      static [entityKind] = "PgNumeric";
      precision;
      scale;
      constructor(table, config2) {
        super(table, config2);
        this.precision = config2.precision;
        this.scale = config2.scale;
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") return value;
        return String(value);
      }
      getSQLType() {
        if (this.precision !== void 0 && this.scale !== void 0) {
          return `numeric(${this.precision}, ${this.scale})`;
        } else if (this.precision === void 0) {
          return "numeric";
        } else {
          return `numeric(${this.precision})`;
        }
      }
    };
    PgNumericNumberBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgNumericNumberBuilder";
      constructor(name, precision, scale) {
        super(name, "number", "PgNumericNumber");
        this.config.precision = precision;
        this.config.scale = scale;
      }
      /** @internal */
      build(table) {
        return new PgNumericNumber(
          table,
          this.config
        );
      }
    };
    PgNumericNumber = class extends PgColumn {
      static [entityKind] = "PgNumericNumber";
      precision;
      scale;
      constructor(table, config2) {
        super(table, config2);
        this.precision = config2.precision;
        this.scale = config2.scale;
      }
      mapFromDriverValue(value) {
        if (typeof value === "number") return value;
        return Number(value);
      }
      mapToDriverValue = String;
      getSQLType() {
        if (this.precision !== void 0 && this.scale !== void 0) {
          return `numeric(${this.precision}, ${this.scale})`;
        } else if (this.precision === void 0) {
          return "numeric";
        } else {
          return `numeric(${this.precision})`;
        }
      }
    };
    PgNumericBigIntBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgNumericBigIntBuilder";
      constructor(name, precision, scale) {
        super(name, "bigint", "PgNumericBigInt");
        this.config.precision = precision;
        this.config.scale = scale;
      }
      /** @internal */
      build(table) {
        return new PgNumericBigInt(
          table,
          this.config
        );
      }
    };
    PgNumericBigInt = class extends PgColumn {
      static [entityKind] = "PgNumericBigInt";
      precision;
      scale;
      constructor(table, config2) {
        super(table, config2);
        this.precision = config2.precision;
        this.scale = config2.scale;
      }
      mapFromDriverValue = BigInt;
      mapToDriverValue = String;
      getSQLType() {
        if (this.precision !== void 0 && this.scale !== void 0) {
          return `numeric(${this.precision}, ${this.scale})`;
        } else if (this.precision === void 0) {
          return "numeric";
        } else {
          return `numeric(${this.precision})`;
        }
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/point.js
function point(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  if (!config2?.mode || config2.mode === "tuple") {
    return new PgPointTupleBuilder(name);
  }
  return new PgPointObjectBuilder(name);
}
var PgPointTupleBuilder, PgPointTuple, PgPointObjectBuilder, PgPointObject;
var init_point = __esm({
  "node_modules/drizzle-orm/pg-core/columns/point.js"() {
    init_entity();
    init_utils();
    init_common();
    PgPointTupleBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgPointTupleBuilder";
      constructor(name) {
        super(name, "array", "PgPointTuple");
      }
      /** @internal */
      build(table) {
        return new PgPointTuple(
          table,
          this.config
        );
      }
    };
    PgPointTuple = class extends PgColumn {
      static [entityKind] = "PgPointTuple";
      getSQLType() {
        return "point";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          const [x, y] = value.slice(1, -1).split(",");
          return [Number.parseFloat(x), Number.parseFloat(y)];
        }
        return [value.x, value.y];
      }
      mapToDriverValue(value) {
        return `(${value[0]},${value[1]})`;
      }
    };
    PgPointObjectBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgPointObjectBuilder";
      constructor(name) {
        super(name, "json", "PgPointObject");
      }
      /** @internal */
      build(table) {
        return new PgPointObject(
          table,
          this.config
        );
      }
    };
    PgPointObject = class extends PgColumn {
      static [entityKind] = "PgPointObject";
      getSQLType() {
        return "point";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          const [x, y] = value.slice(1, -1).split(",");
          return { x: Number.parseFloat(x), y: Number.parseFloat(y) };
        }
        return value;
      }
      mapToDriverValue(value) {
        return `(${value.x},${value.y})`;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/postgis_extension/utils.js
function hexToBytes(hex) {
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(Number.parseInt(hex.slice(c, c + 2), 16));
  }
  return new Uint8Array(bytes);
}
function bytesToFloat64(bytes, offset) {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  for (let i = 0; i < 8; i++) {
    view.setUint8(i, bytes[offset + i]);
  }
  return view.getFloat64(0, true);
}
function parseEWKB(hex) {
  const bytes = hexToBytes(hex);
  let offset = 0;
  const byteOrder = bytes[offset];
  offset += 1;
  const view = new DataView(bytes.buffer);
  const geomType = view.getUint32(offset, byteOrder === 1);
  offset += 4;
  let _srid;
  if (geomType & 536870912) {
    _srid = view.getUint32(offset, byteOrder === 1);
    offset += 4;
  }
  if ((geomType & 65535) === 1) {
    const x = bytesToFloat64(bytes, offset);
    offset += 8;
    const y = bytesToFloat64(bytes, offset);
    offset += 8;
    return [x, y];
  }
  throw new Error("Unsupported geometry type");
}
var init_utils2 = __esm({
  "node_modules/drizzle-orm/pg-core/columns/postgis_extension/utils.js"() {
  }
});

// node_modules/drizzle-orm/pg-core/columns/postgis_extension/geometry.js
function geometry(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  if (!config2?.mode || config2.mode === "tuple") {
    return new PgGeometryBuilder(name);
  }
  return new PgGeometryObjectBuilder(name);
}
var PgGeometryBuilder, PgGeometry, PgGeometryObjectBuilder, PgGeometryObject;
var init_geometry = __esm({
  "node_modules/drizzle-orm/pg-core/columns/postgis_extension/geometry.js"() {
    init_entity();
    init_utils();
    init_common();
    init_utils2();
    PgGeometryBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgGeometryBuilder";
      constructor(name) {
        super(name, "array", "PgGeometry");
      }
      /** @internal */
      build(table) {
        return new PgGeometry(
          table,
          this.config
        );
      }
    };
    PgGeometry = class extends PgColumn {
      static [entityKind] = "PgGeometry";
      getSQLType() {
        return "geometry(point)";
      }
      mapFromDriverValue(value) {
        return parseEWKB(value);
      }
      mapToDriverValue(value) {
        return `point(${value[0]} ${value[1]})`;
      }
    };
    PgGeometryObjectBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgGeometryObjectBuilder";
      constructor(name) {
        super(name, "json", "PgGeometryObject");
      }
      /** @internal */
      build(table) {
        return new PgGeometryObject(
          table,
          this.config
        );
      }
    };
    PgGeometryObject = class extends PgColumn {
      static [entityKind] = "PgGeometryObject";
      getSQLType() {
        return "geometry(point)";
      }
      mapFromDriverValue(value) {
        const parsed = parseEWKB(value);
        return { x: parsed[0], y: parsed[1] };
      }
      mapToDriverValue(value) {
        return `point(${value.x} ${value.y})`;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/real.js
function real(name) {
  return new PgRealBuilder(name ?? "");
}
var PgRealBuilder, PgReal;
var init_real = __esm({
  "node_modules/drizzle-orm/pg-core/columns/real.js"() {
    init_entity();
    init_common();
    PgRealBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgRealBuilder";
      constructor(name, length) {
        super(name, "number", "PgReal");
        this.config.length = length;
      }
      /** @internal */
      build(table) {
        return new PgReal(table, this.config);
      }
    };
    PgReal = class extends PgColumn {
      static [entityKind] = "PgReal";
      constructor(table, config2) {
        super(table, config2);
      }
      getSQLType() {
        return "real";
      }
      mapFromDriverValue = (value) => {
        if (typeof value === "string") {
          return Number.parseFloat(value);
        }
        return value;
      };
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/serial.js
function serial(name) {
  return new PgSerialBuilder(name ?? "");
}
var PgSerialBuilder, PgSerial;
var init_serial = __esm({
  "node_modules/drizzle-orm/pg-core/columns/serial.js"() {
    init_entity();
    init_common();
    PgSerialBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgSerialBuilder";
      constructor(name) {
        super(name, "number", "PgSerial");
        this.config.hasDefault = true;
        this.config.notNull = true;
      }
      /** @internal */
      build(table) {
        return new PgSerial(table, this.config);
      }
    };
    PgSerial = class extends PgColumn {
      static [entityKind] = "PgSerial";
      getSQLType() {
        return "serial";
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/smallint.js
function smallint(name) {
  return new PgSmallIntBuilder(name ?? "");
}
var PgSmallIntBuilder, PgSmallInt;
var init_smallint = __esm({
  "node_modules/drizzle-orm/pg-core/columns/smallint.js"() {
    init_entity();
    init_common();
    init_int_common();
    PgSmallIntBuilder = class extends PgIntColumnBaseBuilder {
      static [entityKind] = "PgSmallIntBuilder";
      constructor(name) {
        super(name, "number", "PgSmallInt");
      }
      /** @internal */
      build(table) {
        return new PgSmallInt(table, this.config);
      }
    };
    PgSmallInt = class extends PgColumn {
      static [entityKind] = "PgSmallInt";
      getSQLType() {
        return "smallint";
      }
      mapFromDriverValue = (value) => {
        if (typeof value === "string") {
          return Number(value);
        }
        return value;
      };
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/smallserial.js
function smallserial(name) {
  return new PgSmallSerialBuilder(name ?? "");
}
var PgSmallSerialBuilder, PgSmallSerial;
var init_smallserial = __esm({
  "node_modules/drizzle-orm/pg-core/columns/smallserial.js"() {
    init_entity();
    init_common();
    PgSmallSerialBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgSmallSerialBuilder";
      constructor(name) {
        super(name, "number", "PgSmallSerial");
        this.config.hasDefault = true;
        this.config.notNull = true;
      }
      /** @internal */
      build(table) {
        return new PgSmallSerial(
          table,
          this.config
        );
      }
    };
    PgSmallSerial = class extends PgColumn {
      static [entityKind] = "PgSmallSerial";
      getSQLType() {
        return "smallserial";
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/text.js
function text(a, b = {}) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgTextBuilder(name, config2);
}
var PgTextBuilder, PgText;
var init_text = __esm({
  "node_modules/drizzle-orm/pg-core/columns/text.js"() {
    init_entity();
    init_utils();
    init_common();
    PgTextBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgTextBuilder";
      constructor(name, config2) {
        super(name, "string", "PgText");
        this.config.enumValues = config2.enum;
      }
      /** @internal */
      build(table) {
        return new PgText(table, this.config);
      }
    };
    PgText = class extends PgColumn {
      static [entityKind] = "PgText";
      enumValues = this.config.enumValues;
      getSQLType() {
        return "text";
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/time.js
function time(a, b = {}) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgTimeBuilder(name, config2.withTimezone ?? false, config2.precision);
}
var PgTimeBuilder, PgTime;
var init_time = __esm({
  "node_modules/drizzle-orm/pg-core/columns/time.js"() {
    init_entity();
    init_utils();
    init_common();
    init_date_common();
    PgTimeBuilder = class extends PgDateColumnBaseBuilder {
      constructor(name, withTimezone, precision) {
        super(name, "string", "PgTime");
        this.withTimezone = withTimezone;
        this.precision = precision;
        this.config.withTimezone = withTimezone;
        this.config.precision = precision;
      }
      static [entityKind] = "PgTimeBuilder";
      /** @internal */
      build(table) {
        return new PgTime(table, this.config);
      }
    };
    PgTime = class extends PgColumn {
      static [entityKind] = "PgTime";
      withTimezone;
      precision;
      constructor(table, config2) {
        super(table, config2);
        this.withTimezone = config2.withTimezone;
        this.precision = config2.precision;
      }
      getSQLType() {
        const precision = this.precision === void 0 ? "" : `(${this.precision})`;
        return `time${precision}${this.withTimezone ? " with time zone" : ""}`;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/timestamp.js
function timestamp(a, b = {}) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  if (config2?.mode === "string") {
    return new PgTimestampStringBuilder(name, config2.withTimezone ?? false, config2.precision);
  }
  return new PgTimestampBuilder(name, config2?.withTimezone ?? false, config2?.precision);
}
var PgTimestampBuilder, PgTimestamp, PgTimestampStringBuilder, PgTimestampString;
var init_timestamp = __esm({
  "node_modules/drizzle-orm/pg-core/columns/timestamp.js"() {
    init_entity();
    init_utils();
    init_common();
    init_date_common();
    PgTimestampBuilder = class extends PgDateColumnBaseBuilder {
      static [entityKind] = "PgTimestampBuilder";
      constructor(name, withTimezone, precision) {
        super(name, "date", "PgTimestamp");
        this.config.withTimezone = withTimezone;
        this.config.precision = precision;
      }
      /** @internal */
      build(table) {
        return new PgTimestamp(table, this.config);
      }
    };
    PgTimestamp = class extends PgColumn {
      static [entityKind] = "PgTimestamp";
      withTimezone;
      precision;
      constructor(table, config2) {
        super(table, config2);
        this.withTimezone = config2.withTimezone;
        this.precision = config2.precision;
      }
      getSQLType() {
        const precision = this.precision === void 0 ? "" : ` (${this.precision})`;
        return `timestamp${precision}${this.withTimezone ? " with time zone" : ""}`;
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") return new Date(this.withTimezone ? value : value + "+0000");
        return value;
      }
      mapToDriverValue = (value) => {
        return value.toISOString();
      };
    };
    PgTimestampStringBuilder = class extends PgDateColumnBaseBuilder {
      static [entityKind] = "PgTimestampStringBuilder";
      constructor(name, withTimezone, precision) {
        super(name, "string", "PgTimestampString");
        this.config.withTimezone = withTimezone;
        this.config.precision = precision;
      }
      /** @internal */
      build(table) {
        return new PgTimestampString(
          table,
          this.config
        );
      }
    };
    PgTimestampString = class extends PgColumn {
      static [entityKind] = "PgTimestampString";
      withTimezone;
      precision;
      constructor(table, config2) {
        super(table, config2);
        this.withTimezone = config2.withTimezone;
        this.precision = config2.precision;
      }
      getSQLType() {
        const precision = this.precision === void 0 ? "" : `(${this.precision})`;
        return `timestamp${precision}${this.withTimezone ? " with time zone" : ""}`;
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") return value;
        const shortened = value.toISOString().slice(0, -1).replace("T", " ");
        if (this.withTimezone) {
          const offset = value.getTimezoneOffset();
          const sign = offset <= 0 ? "+" : "-";
          return `${shortened}${sign}${Math.floor(Math.abs(offset) / 60).toString().padStart(2, "0")}`;
        }
        return shortened;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/uuid.js
function uuid(name) {
  return new PgUUIDBuilder(name ?? "");
}
var PgUUIDBuilder, PgUUID;
var init_uuid = __esm({
  "node_modules/drizzle-orm/pg-core/columns/uuid.js"() {
    init_entity();
    init_sql();
    init_common();
    PgUUIDBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgUUIDBuilder";
      constructor(name) {
        super(name, "string", "PgUUID");
      }
      /**
       * Adds `default gen_random_uuid()` to the column definition.
       */
      defaultRandom() {
        return this.default(sql`gen_random_uuid()`);
      }
      /** @internal */
      build(table) {
        return new PgUUID(table, this.config);
      }
    };
    PgUUID = class extends PgColumn {
      static [entityKind] = "PgUUID";
      getSQLType() {
        return "uuid";
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/varchar.js
function varchar(a, b = {}) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgVarcharBuilder(name, config2);
}
var PgVarcharBuilder, PgVarchar;
var init_varchar = __esm({
  "node_modules/drizzle-orm/pg-core/columns/varchar.js"() {
    init_entity();
    init_utils();
    init_common();
    PgVarcharBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgVarcharBuilder";
      constructor(name, config2) {
        super(name, "string", "PgVarchar");
        this.config.length = config2.length;
        this.config.enumValues = config2.enum;
      }
      /** @internal */
      build(table) {
        return new PgVarchar(
          table,
          this.config
        );
      }
    };
    PgVarchar = class extends PgColumn {
      static [entityKind] = "PgVarchar";
      length = this.config.length;
      enumValues = this.config.enumValues;
      getSQLType() {
        return this.length === void 0 ? `varchar` : `varchar(${this.length})`;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/vector_extension/bit.js
function bit(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgBinaryVectorBuilder(name, config2);
}
var PgBinaryVectorBuilder, PgBinaryVector;
var init_bit = __esm({
  "node_modules/drizzle-orm/pg-core/columns/vector_extension/bit.js"() {
    init_entity();
    init_utils();
    init_common();
    PgBinaryVectorBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgBinaryVectorBuilder";
      constructor(name, config2) {
        super(name, "string", "PgBinaryVector");
        this.config.dimensions = config2.dimensions;
      }
      /** @internal */
      build(table) {
        return new PgBinaryVector(
          table,
          this.config
        );
      }
    };
    PgBinaryVector = class extends PgColumn {
      static [entityKind] = "PgBinaryVector";
      dimensions = this.config.dimensions;
      getSQLType() {
        return `bit(${this.dimensions})`;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/vector_extension/halfvec.js
function halfvec(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgHalfVectorBuilder(name, config2);
}
var PgHalfVectorBuilder, PgHalfVector;
var init_halfvec = __esm({
  "node_modules/drizzle-orm/pg-core/columns/vector_extension/halfvec.js"() {
    init_entity();
    init_utils();
    init_common();
    PgHalfVectorBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgHalfVectorBuilder";
      constructor(name, config2) {
        super(name, "array", "PgHalfVector");
        this.config.dimensions = config2.dimensions;
      }
      /** @internal */
      build(table) {
        return new PgHalfVector(
          table,
          this.config
        );
      }
    };
    PgHalfVector = class extends PgColumn {
      static [entityKind] = "PgHalfVector";
      dimensions = this.config.dimensions;
      getSQLType() {
        return `halfvec(${this.dimensions})`;
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
      mapFromDriverValue(value) {
        return value.slice(1, -1).split(",").map((v) => Number.parseFloat(v));
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/vector_extension/sparsevec.js
function sparsevec(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgSparseVectorBuilder(name, config2);
}
var PgSparseVectorBuilder, PgSparseVector;
var init_sparsevec = __esm({
  "node_modules/drizzle-orm/pg-core/columns/vector_extension/sparsevec.js"() {
    init_entity();
    init_utils();
    init_common();
    PgSparseVectorBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgSparseVectorBuilder";
      constructor(name, config2) {
        super(name, "string", "PgSparseVector");
        this.config.dimensions = config2.dimensions;
      }
      /** @internal */
      build(table) {
        return new PgSparseVector(
          table,
          this.config
        );
      }
    };
    PgSparseVector = class extends PgColumn {
      static [entityKind] = "PgSparseVector";
      dimensions = this.config.dimensions;
      getSQLType() {
        return `sparsevec(${this.dimensions})`;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/vector_extension/vector.js
function vector(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgVectorBuilder(name, config2);
}
var PgVectorBuilder, PgVector;
var init_vector = __esm({
  "node_modules/drizzle-orm/pg-core/columns/vector_extension/vector.js"() {
    init_entity();
    init_utils();
    init_common();
    PgVectorBuilder = class extends PgColumnBuilder {
      static [entityKind] = "PgVectorBuilder";
      constructor(name, config2) {
        super(name, "array", "PgVector");
        this.config.dimensions = config2.dimensions;
      }
      /** @internal */
      build(table) {
        return new PgVector(
          table,
          this.config
        );
      }
    };
    PgVector = class extends PgColumn {
      static [entityKind] = "PgVector";
      dimensions = this.config.dimensions;
      getSQLType() {
        return `vector(${this.dimensions})`;
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
      mapFromDriverValue(value) {
        return value.slice(1, -1).split(",").map((v) => Number.parseFloat(v));
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/all.js
function getPgColumnBuilders() {
  return {
    bigint,
    bigserial,
    boolean,
    char,
    cidr,
    customType,
    date,
    doublePrecision,
    inet,
    integer,
    interval,
    json: json2,
    jsonb,
    line,
    macaddr,
    macaddr8,
    numeric,
    point,
    geometry,
    real,
    serial,
    smallint,
    smallserial,
    text,
    time,
    timestamp,
    uuid,
    varchar,
    bit,
    halfvec,
    sparsevec,
    vector
  };
}
var init_all = __esm({
  "node_modules/drizzle-orm/pg-core/columns/all.js"() {
    init_bigint();
    init_bigserial();
    init_boolean();
    init_char();
    init_cidr();
    init_custom();
    init_date();
    init_double_precision();
    init_inet();
    init_integer();
    init_interval();
    init_json();
    init_jsonb();
    init_line();
    init_macaddr();
    init_macaddr8();
    init_numeric();
    init_point();
    init_geometry();
    init_real();
    init_serial();
    init_smallint();
    init_smallserial();
    init_text();
    init_time();
    init_timestamp();
    init_uuid();
    init_varchar();
    init_bit();
    init_halfvec();
    init_sparsevec();
    init_vector();
  }
});

// node_modules/drizzle-orm/pg-core/table.js
function pgTableWithSchema(name, columns, extraConfig, schema, baseName = name) {
  const rawTable = new PgTable(name, schema, baseName);
  const parsedColumns = typeof columns === "function" ? columns(getPgColumnBuilders()) : columns;
  const builtColumns = Object.fromEntries(
    Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
      const colBuilder = colBuilderBase;
      colBuilder.setName(name2);
      const column = colBuilder.build(rawTable);
      rawTable[InlineForeignKeys].push(...colBuilder.buildForeignKeys(column, rawTable));
      return [name2, column];
    })
  );
  const builtColumnsForExtraConfig = Object.fromEntries(
    Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
      const colBuilder = colBuilderBase;
      colBuilder.setName(name2);
      const column = colBuilder.buildExtraConfigColumn(rawTable);
      return [name2, column];
    })
  );
  const table = Object.assign(rawTable, builtColumns);
  table[Table.Symbol.Columns] = builtColumns;
  table[Table.Symbol.ExtraConfigColumns] = builtColumnsForExtraConfig;
  if (extraConfig) {
    table[PgTable.Symbol.ExtraConfigBuilder] = extraConfig;
  }
  return Object.assign(table, {
    enableRLS: () => {
      table[PgTable.Symbol.EnableRLS] = true;
      return table;
    }
  });
}
var InlineForeignKeys, EnableRLS, PgTable, pgTable;
var init_table2 = __esm({
  "node_modules/drizzle-orm/pg-core/table.js"() {
    init_entity();
    init_table();
    init_all();
    InlineForeignKeys = /* @__PURE__ */ Symbol.for("drizzle:PgInlineForeignKeys");
    EnableRLS = /* @__PURE__ */ Symbol.for("drizzle:EnableRLS");
    PgTable = class extends Table {
      static [entityKind] = "PgTable";
      /** @internal */
      static Symbol = Object.assign({}, Table.Symbol, {
        InlineForeignKeys,
        EnableRLS
      });
      /**@internal */
      [InlineForeignKeys] = [];
      /** @internal */
      [EnableRLS] = false;
      /** @internal */
      [Table.Symbol.ExtraConfigBuilder] = void 0;
      /** @internal */
      [Table.Symbol.ExtraConfigColumns] = {};
    };
    pgTable = (name, columns, extraConfig) => {
      return pgTableWithSchema(name, columns, extraConfig, void 0);
    };
  }
});

// node_modules/drizzle-orm/pg-core/primary-keys.js
var PrimaryKeyBuilder, PrimaryKey;
var init_primary_keys = __esm({
  "node_modules/drizzle-orm/pg-core/primary-keys.js"() {
    init_entity();
    init_table2();
    PrimaryKeyBuilder = class {
      static [entityKind] = "PgPrimaryKeyBuilder";
      /** @internal */
      columns;
      /** @internal */
      name;
      constructor(columns, name) {
        this.columns = columns;
        this.name = name;
      }
      /** @internal */
      build(table) {
        return new PrimaryKey(table, this.columns, this.name);
      }
    };
    PrimaryKey = class {
      constructor(table, columns, name) {
        this.table = table;
        this.columns = columns;
        this.name = name;
      }
      static [entityKind] = "PgPrimaryKey";
      columns;
      name;
      getName() {
        return this.name ?? `${this.table[PgTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
      }
    };
  }
});

// node_modules/drizzle-orm/sql/expressions/conditions.js
function bindIfParam(value, column) {
  if (isDriverValueEncoder(column) && !isSQLWrapper(value) && !is(value, Param) && !is(value, Placeholder) && !is(value, Column) && !is(value, Table) && !is(value, View)) {
    return new Param(value, column);
  }
  return value;
}
function and(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter(
    (c) => c !== void 0
  );
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" and ")),
    new StringChunk(")")
  ]);
}
function or(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter(
    (c) => c !== void 0
  );
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" or ")),
    new StringChunk(")")
  ]);
}
function not(condition) {
  return sql`not ${condition}`;
}
function inArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      return sql`false`;
    }
    return sql`${column} in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql`${column} in ${bindIfParam(values, column)}`;
}
function notInArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      return sql`true`;
    }
    return sql`${column} not in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql`${column} not in ${bindIfParam(values, column)}`;
}
function isNull(value) {
  return sql`${value} is null`;
}
function isNotNull(value) {
  return sql`${value} is not null`;
}
function exists(subquery) {
  return sql`exists ${subquery}`;
}
function notExists(subquery) {
  return sql`not exists ${subquery}`;
}
function between(column, min, max) {
  return sql`${column} between ${bindIfParam(min, column)} and ${bindIfParam(
    max,
    column
  )}`;
}
function notBetween(column, min, max) {
  return sql`${column} not between ${bindIfParam(
    min,
    column
  )} and ${bindIfParam(max, column)}`;
}
function like(column, value) {
  return sql`${column} like ${value}`;
}
function notLike(column, value) {
  return sql`${column} not like ${value}`;
}
function ilike(column, value) {
  return sql`${column} ilike ${value}`;
}
function notIlike(column, value) {
  return sql`${column} not ilike ${value}`;
}
var eq, ne, gt, gte, lt, lte;
var init_conditions = __esm({
  "node_modules/drizzle-orm/sql/expressions/conditions.js"() {
    init_column();
    init_entity();
    init_table();
    init_sql();
    eq = (left, right) => {
      return sql`${left} = ${bindIfParam(right, left)}`;
    };
    ne = (left, right) => {
      return sql`${left} <> ${bindIfParam(right, left)}`;
    };
    gt = (left, right) => {
      return sql`${left} > ${bindIfParam(right, left)}`;
    };
    gte = (left, right) => {
      return sql`${left} >= ${bindIfParam(right, left)}`;
    };
    lt = (left, right) => {
      return sql`${left} < ${bindIfParam(right, left)}`;
    };
    lte = (left, right) => {
      return sql`${left} <= ${bindIfParam(right, left)}`;
    };
  }
});

// node_modules/drizzle-orm/sql/expressions/select.js
function asc(column) {
  return sql`${column} asc`;
}
function desc(column) {
  return sql`${column} desc`;
}
var init_select = __esm({
  "node_modules/drizzle-orm/sql/expressions/select.js"() {
    init_sql();
  }
});

// node_modules/drizzle-orm/sql/expressions/index.js
var init_expressions = __esm({
  "node_modules/drizzle-orm/sql/expressions/index.js"() {
    init_conditions();
    init_select();
  }
});

// node_modules/drizzle-orm/relations.js
function getOperators() {
  return {
    and,
    between,
    eq,
    exists,
    gt,
    gte,
    ilike,
    inArray,
    isNull,
    isNotNull,
    like,
    lt,
    lte,
    ne,
    not,
    notBetween,
    notExists,
    notLike,
    notIlike,
    notInArray,
    or,
    sql
  };
}
function getOrderByOperators() {
  return {
    sql,
    asc,
    desc
  };
}
function extractTablesRelationalConfig(schema, configHelpers) {
  if (Object.keys(schema).length === 1 && "default" in schema && !is(schema["default"], Table)) {
    schema = schema["default"];
  }
  const tableNamesMap = {};
  const relationsBuffer = {};
  const tablesConfig = {};
  for (const [key, value] of Object.entries(schema)) {
    if (is(value, Table)) {
      const dbName = getTableUniqueName(value);
      const bufferedRelations = relationsBuffer[dbName];
      tableNamesMap[dbName] = key;
      tablesConfig[key] = {
        tsName: key,
        dbName: value[Table.Symbol.Name],
        schema: value[Table.Symbol.Schema],
        columns: value[Table.Symbol.Columns],
        relations: bufferedRelations?.relations ?? {},
        primaryKey: bufferedRelations?.primaryKey ?? []
      };
      for (const column of Object.values(
        value[Table.Symbol.Columns]
      )) {
        if (column.primary) {
          tablesConfig[key].primaryKey.push(column);
        }
      }
      const extraConfig = value[Table.Symbol.ExtraConfigBuilder]?.(value[Table.Symbol.ExtraConfigColumns]);
      if (extraConfig) {
        for (const configEntry of Object.values(extraConfig)) {
          if (is(configEntry, PrimaryKeyBuilder)) {
            tablesConfig[key].primaryKey.push(...configEntry.columns);
          }
        }
      }
    } else if (is(value, Relations)) {
      const dbName = getTableUniqueName(value.table);
      const tableName = tableNamesMap[dbName];
      const relations2 = value.config(
        configHelpers(value.table)
      );
      let primaryKey;
      for (const [relationName, relation] of Object.entries(relations2)) {
        if (tableName) {
          const tableConfig = tablesConfig[tableName];
          tableConfig.relations[relationName] = relation;
          if (primaryKey) {
            tableConfig.primaryKey.push(...primaryKey);
          }
        } else {
          if (!(dbName in relationsBuffer)) {
            relationsBuffer[dbName] = {
              relations: {},
              primaryKey
            };
          }
          relationsBuffer[dbName].relations[relationName] = relation;
        }
      }
    }
  }
  return { tables: tablesConfig, tableNamesMap };
}
function relations(table, relations2) {
  return new Relations(
    table,
    (helpers) => Object.fromEntries(
      Object.entries(relations2(helpers)).map(([key, value]) => [
        key,
        value.withFieldName(key)
      ])
    )
  );
}
function createOne(sourceTable) {
  return function one(table, config2) {
    return new One(
      sourceTable,
      table,
      config2,
      config2?.fields.reduce((res, f) => res && f.notNull, true) ?? false
    );
  };
}
function createMany(sourceTable) {
  return function many(referencedTable, config2) {
    return new Many(sourceTable, referencedTable, config2);
  };
}
function normalizeRelation(schema, tableNamesMap, relation) {
  if (is(relation, One) && relation.config) {
    return {
      fields: relation.config.fields,
      references: relation.config.references
    };
  }
  const referencedTableTsName = tableNamesMap[getTableUniqueName(relation.referencedTable)];
  if (!referencedTableTsName) {
    throw new Error(
      `Table "${relation.referencedTable[Table.Symbol.Name]}" not found in schema`
    );
  }
  const referencedTableConfig = schema[referencedTableTsName];
  if (!referencedTableConfig) {
    throw new Error(`Table "${referencedTableTsName}" not found in schema`);
  }
  const sourceTable = relation.sourceTable;
  const sourceTableTsName = tableNamesMap[getTableUniqueName(sourceTable)];
  if (!sourceTableTsName) {
    throw new Error(
      `Table "${sourceTable[Table.Symbol.Name]}" not found in schema`
    );
  }
  const reverseRelations = [];
  for (const referencedTableRelation of Object.values(
    referencedTableConfig.relations
  )) {
    if (relation.relationName && relation !== referencedTableRelation && referencedTableRelation.relationName === relation.relationName || !relation.relationName && referencedTableRelation.referencedTable === relation.sourceTable) {
      reverseRelations.push(referencedTableRelation);
    }
  }
  if (reverseRelations.length > 1) {
    throw relation.relationName ? new Error(
      `There are multiple relations with name "${relation.relationName}" in table "${referencedTableTsName}"`
    ) : new Error(
      `There are multiple relations between "${referencedTableTsName}" and "${relation.sourceTable[Table.Symbol.Name]}". Please specify relation name`
    );
  }
  if (reverseRelations[0] && is(reverseRelations[0], One) && reverseRelations[0].config) {
    return {
      fields: reverseRelations[0].config.references,
      references: reverseRelations[0].config.fields
    };
  }
  throw new Error(
    `There is not enough information to infer relation "${sourceTableTsName}.${relation.fieldName}"`
  );
}
function createTableRelationsHelpers(sourceTable) {
  return {
    one: createOne(sourceTable),
    many: createMany(sourceTable)
  };
}
function mapRelationalRow(tablesConfig, tableConfig, row, buildQueryResultSelection, mapColumnValue = (value) => value) {
  const result = {};
  for (const [
    selectionItemIndex,
    selectionItem
  ] of buildQueryResultSelection.entries()) {
    if (selectionItem.isJson) {
      const relation = tableConfig.relations[selectionItem.tsKey];
      const rawSubRows = row[selectionItemIndex];
      const subRows = typeof rawSubRows === "string" ? JSON.parse(rawSubRows) : rawSubRows;
      result[selectionItem.tsKey] = is(relation, One) ? subRows && mapRelationalRow(
        tablesConfig,
        tablesConfig[selectionItem.relationTableTsKey],
        subRows,
        selectionItem.selection,
        mapColumnValue
      ) : subRows.map(
        (subRow) => mapRelationalRow(
          tablesConfig,
          tablesConfig[selectionItem.relationTableTsKey],
          subRow,
          selectionItem.selection,
          mapColumnValue
        )
      );
    } else {
      const value = mapColumnValue(row[selectionItemIndex]);
      const field = selectionItem.field;
      let decoder;
      if (is(field, Column)) {
        decoder = field;
      } else if (is(field, SQL)) {
        decoder = field.decoder;
      } else {
        decoder = field.sql.decoder;
      }
      result[selectionItem.tsKey] = value === null ? null : decoder.mapFromDriverValue(value);
    }
  }
  return result;
}
var Relation, Relations, One, Many;
var init_relations = __esm({
  "node_modules/drizzle-orm/relations.js"() {
    init_table();
    init_column();
    init_entity();
    init_primary_keys();
    init_expressions();
    init_sql();
    Relation = class {
      constructor(sourceTable, referencedTable, relationName) {
        this.sourceTable = sourceTable;
        this.referencedTable = referencedTable;
        this.relationName = relationName;
        this.referencedTableName = referencedTable[Table.Symbol.Name];
      }
      static [entityKind] = "Relation";
      referencedTableName;
      fieldName;
    };
    Relations = class {
      constructor(table, config2) {
        this.table = table;
        this.config = config2;
      }
      static [entityKind] = "Relations";
    };
    One = class _One extends Relation {
      constructor(sourceTable, referencedTable, config2, isNullable) {
        super(sourceTable, referencedTable, config2?.relationName);
        this.config = config2;
        this.isNullable = isNullable;
      }
      static [entityKind] = "One";
      withFieldName(fieldName) {
        const relation = new _One(
          this.sourceTable,
          this.referencedTable,
          this.config,
          this.isNullable
        );
        relation.fieldName = fieldName;
        return relation;
      }
    };
    Many = class _Many extends Relation {
      constructor(sourceTable, referencedTable, config2) {
        super(sourceTable, referencedTable, config2?.relationName);
        this.config = config2;
      }
      static [entityKind] = "Many";
      withFieldName(fieldName) {
        const relation = new _Many(
          this.sourceTable,
          this.referencedTable,
          this.config
        );
        relation.fieldName = fieldName;
        return relation;
      }
    };
  }
});

// node_modules/drizzle-orm/sql/functions/aggregate.js
var init_aggregate = __esm({
  "node_modules/drizzle-orm/sql/functions/aggregate.js"() {
  }
});

// node_modules/drizzle-orm/sql/functions/vector.js
var init_vector2 = __esm({
  "node_modules/drizzle-orm/sql/functions/vector.js"() {
  }
});

// node_modules/drizzle-orm/sql/functions/index.js
var init_functions = __esm({
  "node_modules/drizzle-orm/sql/functions/index.js"() {
    init_aggregate();
    init_vector2();
  }
});

// node_modules/drizzle-orm/sql/index.js
var init_sql2 = __esm({
  "node_modules/drizzle-orm/sql/index.js"() {
    init_expressions();
    init_functions();
    init_sql();
  }
});

// node_modules/drizzle-orm/index.js
var init_drizzle_orm = __esm({
  "node_modules/drizzle-orm/index.js"() {
    init_alias();
    init_column_builder();
    init_column();
    init_entity();
    init_errors();
    init_logger();
    init_operations();
    init_query_promise();
    init_relations();
    init_sql2();
    init_subquery();
    init_table();
    init_utils();
    init_view_common();
  }
});

// node_modules/drizzle-orm/selection-proxy.js
var SelectionProxyHandler;
var init_selection_proxy = __esm({
  "node_modules/drizzle-orm/selection-proxy.js"() {
    init_alias();
    init_column();
    init_entity();
    init_sql();
    init_subquery();
    init_view_common();
    SelectionProxyHandler = class _SelectionProxyHandler {
      static [entityKind] = "SelectionProxyHandler";
      config;
      constructor(config2) {
        this.config = { ...config2 };
      }
      get(subquery, prop) {
        if (prop === "_") {
          return {
            ...subquery["_"],
            selectedFields: new Proxy(
              subquery._.selectedFields,
              this
            )
          };
        }
        if (prop === ViewBaseConfig) {
          return {
            ...subquery[ViewBaseConfig],
            selectedFields: new Proxy(
              subquery[ViewBaseConfig].selectedFields,
              this
            )
          };
        }
        if (typeof prop === "symbol") {
          return subquery[prop];
        }
        const columns = is(subquery, Subquery) ? subquery._.selectedFields : is(subquery, View) ? subquery[ViewBaseConfig].selectedFields : subquery;
        const value = columns[prop];
        if (is(value, SQL.Aliased)) {
          if (this.config.sqlAliasedBehavior === "sql" && !value.isSelectionField) {
            return value.sql;
          }
          const newValue = value.clone();
          newValue.isSelectionField = true;
          return newValue;
        }
        if (is(value, SQL)) {
          if (this.config.sqlBehavior === "sql") {
            return value;
          }
          throw new Error(
            `You tried to reference "${prop}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`
          );
        }
        if (is(value, Column)) {
          if (this.config.alias) {
            return new Proxy(
              value,
              new ColumnAliasProxyHandler(
                new Proxy(
                  value.table,
                  new TableAliasProxyHandler(this.config.alias, this.config.replaceOriginalName ?? false)
                )
              )
            );
          }
          return value;
        }
        if (typeof value !== "object" || value === null) {
          return value;
        }
        return new Proxy(value, new _SelectionProxyHandler(this.config));
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/checks.js
var CheckBuilder, Check;
var init_checks = __esm({
  "node_modules/drizzle-orm/pg-core/checks.js"() {
    init_entity();
    CheckBuilder = class {
      constructor(name, value) {
        this.name = name;
        this.value = value;
      }
      static [entityKind] = "PgCheckBuilder";
      brand;
      /** @internal */
      build(table) {
        return new Check(table, this);
      }
    };
    Check = class {
      constructor(table, builder) {
        this.table = table;
        this.name = builder.name;
        this.value = builder.value;
      }
      static [entityKind] = "PgCheck";
      name;
      value;
    };
  }
});

// node_modules/drizzle-orm/pg-core/columns/index.js
var init_columns = __esm({
  "node_modules/drizzle-orm/pg-core/columns/index.js"() {
    init_bigint();
    init_bigserial();
    init_boolean();
    init_char();
    init_cidr();
    init_common();
    init_custom();
    init_date();
    init_double_precision();
    init_enum();
    init_inet();
    init_int_common();
    init_integer();
    init_interval();
    init_json();
    init_jsonb();
    init_line();
    init_macaddr();
    init_macaddr8();
    init_numeric();
    init_point();
    init_geometry();
    init_real();
    init_serial();
    init_smallint();
    init_smallserial();
    init_text();
    init_time();
    init_timestamp();
    init_uuid();
    init_varchar();
    init_bit();
    init_halfvec();
    init_sparsevec();
    init_vector();
  }
});

// node_modules/drizzle-orm/pg-core/indexes.js
function index(name) {
  return new IndexBuilderOn(false, name);
}
function uniqueIndex(name) {
  return new IndexBuilderOn(true, name);
}
var IndexBuilderOn, IndexBuilder, Index;
var init_indexes = __esm({
  "node_modules/drizzle-orm/pg-core/indexes.js"() {
    init_sql();
    init_entity();
    init_columns();
    IndexBuilderOn = class {
      constructor(unique, name) {
        this.unique = unique;
        this.name = name;
      }
      static [entityKind] = "PgIndexBuilderOn";
      on(...columns) {
        return new IndexBuilder(
          columns.map((it) => {
            if (is(it, SQL)) {
              return it;
            }
            it = it;
            const clonedIndexedColumn = new IndexedColumn(it.name, !!it.keyAsName, it.columnType, it.indexConfig);
            it.indexConfig = JSON.parse(JSON.stringify(it.defaultConfig));
            return clonedIndexedColumn;
          }),
          this.unique,
          false,
          this.name
        );
      }
      onOnly(...columns) {
        return new IndexBuilder(
          columns.map((it) => {
            if (is(it, SQL)) {
              return it;
            }
            it = it;
            const clonedIndexedColumn = new IndexedColumn(it.name, !!it.keyAsName, it.columnType, it.indexConfig);
            it.indexConfig = it.defaultConfig;
            return clonedIndexedColumn;
          }),
          this.unique,
          true,
          this.name
        );
      }
      /**
       * Specify what index method to use. Choices are `btree`, `hash`, `gist`, `spgist`, `gin`, `brin`, or user-installed access methods like `bloom`. The default method is `btree.
       *
       * If you have the `pg_vector` extension installed in your database, you can use the `hnsw` and `ivfflat` options, which are predefined types.
       *
       * **You can always specify any string you want in the method, in case Drizzle doesn't have it natively in its types**
       *
       * @param method The name of the index method to be used
       * @param columns
       * @returns
       */
      using(method, ...columns) {
        return new IndexBuilder(
          columns.map((it) => {
            if (is(it, SQL)) {
              return it;
            }
            it = it;
            const clonedIndexedColumn = new IndexedColumn(it.name, !!it.keyAsName, it.columnType, it.indexConfig);
            it.indexConfig = JSON.parse(JSON.stringify(it.defaultConfig));
            return clonedIndexedColumn;
          }),
          this.unique,
          true,
          this.name,
          method
        );
      }
    };
    IndexBuilder = class {
      static [entityKind] = "PgIndexBuilder";
      /** @internal */
      config;
      constructor(columns, unique, only, name, method = "btree") {
        this.config = {
          name,
          columns,
          unique,
          only,
          method
        };
      }
      concurrently() {
        this.config.concurrently = true;
        return this;
      }
      with(obj) {
        this.config.with = obj;
        return this;
      }
      where(condition) {
        this.config.where = condition;
        return this;
      }
      /** @internal */
      build(table) {
        return new Index(this.config, table);
      }
    };
    Index = class {
      static [entityKind] = "PgIndex";
      config;
      constructor(config2, table) {
        this.config = { ...config2, table };
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/policies.js
var PgPolicy;
var init_policies = __esm({
  "node_modules/drizzle-orm/pg-core/policies.js"() {
    init_entity();
    PgPolicy = class {
      constructor(name, config2) {
        this.name = name;
        if (config2) {
          this.as = config2.as;
          this.for = config2.for;
          this.to = config2.to;
          this.using = config2.using;
          this.withCheck = config2.withCheck;
        }
      }
      static [entityKind] = "PgPolicy";
      as;
      for;
      to;
      using;
      withCheck;
      /** @internal */
      _linkedTable;
      link(table) {
        this._linkedTable = table;
        return this;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/view-common.js
var PgViewConfig;
var init_view_common2 = __esm({
  "node_modules/drizzle-orm/pg-core/view-common.js"() {
    PgViewConfig = /* @__PURE__ */ Symbol.for("drizzle:PgViewConfig");
  }
});

// node_modules/drizzle-orm/casing.js
function toSnakeCase(input) {
  const words = input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
  return words.map((word) => word.toLowerCase()).join("_");
}
function toCamelCase(input) {
  const words = input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
  return words.reduce((acc, word, i) => {
    const formattedWord = i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.slice(1)}`;
    return acc + formattedWord;
  }, "");
}
function noopCase(input) {
  return input;
}
var CasingCache;
var init_casing = __esm({
  "node_modules/drizzle-orm/casing.js"() {
    init_entity();
    init_table();
    CasingCache = class {
      static [entityKind] = "CasingCache";
      /** @internal */
      cache = {};
      cachedTables = {};
      convert;
      constructor(casing) {
        this.convert = casing === "snake_case" ? toSnakeCase : casing === "camelCase" ? toCamelCase : noopCase;
      }
      getColumnCasing(column) {
        if (!column.keyAsName) return column.name;
        const schema = column.table[Table.Symbol.Schema] ?? "public";
        const tableName = column.table[Table.Symbol.OriginalName];
        const key = `${schema}.${tableName}.${column.name}`;
        if (!this.cache[key]) {
          this.cacheTable(column.table);
        }
        return this.cache[key];
      }
      cacheTable(table) {
        const schema = table[Table.Symbol.Schema] ?? "public";
        const tableName = table[Table.Symbol.OriginalName];
        const tableKey = `${schema}.${tableName}`;
        if (!this.cachedTables[tableKey]) {
          for (const column of Object.values(table[Table.Symbol.Columns])) {
            const columnKey = `${tableKey}.${column.name}`;
            this.cache[columnKey] = this.convert(column.name);
          }
          this.cachedTables[tableKey] = true;
        }
      }
      clearCache() {
        this.cache = {};
        this.cachedTables = {};
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/view-base.js
var PgViewBase;
var init_view_base = __esm({
  "node_modules/drizzle-orm/pg-core/view-base.js"() {
    init_entity();
    init_sql();
    PgViewBase = class extends View {
      static [entityKind] = "PgViewBase";
    };
  }
});

// node_modules/drizzle-orm/pg-core/dialect.js
var PgDialect;
var init_dialect = __esm({
  "node_modules/drizzle-orm/pg-core/dialect.js"() {
    init_alias();
    init_casing();
    init_column();
    init_entity();
    init_errors();
    init_columns();
    init_table2();
    init_relations();
    init_sql2();
    init_sql();
    init_subquery();
    init_table();
    init_utils();
    init_view_common();
    init_view_base();
    PgDialect = class {
      static [entityKind] = "PgDialect";
      /** @internal */
      casing;
      constructor(config2) {
        this.casing = new CasingCache(config2?.casing);
      }
      async migrate(migrations, session, config2) {
        const migrationsTable = typeof config2 === "string" ? "__drizzle_migrations" : config2.migrationsTable ?? "__drizzle_migrations";
        const migrationsSchema = typeof config2 === "string" ? "drizzle" : config2.migrationsSchema ?? "drizzle";
        const migrationTableCreate = sql`
			CREATE TABLE IF NOT EXISTS ${sql.identifier(migrationsSchema)}.${sql.identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at bigint
			)
		`;
        await session.execute(sql`CREATE SCHEMA IF NOT EXISTS ${sql.identifier(migrationsSchema)}`);
        await session.execute(migrationTableCreate);
        const dbMigrations = await session.all(
          sql`select id, hash, created_at from ${sql.identifier(migrationsSchema)}.${sql.identifier(migrationsTable)} order by created_at desc limit 1`
        );
        const lastDbMigration = dbMigrations[0];
        await session.transaction(async (tx) => {
          for await (const migration of migrations) {
            if (!lastDbMigration || Number(lastDbMigration.created_at) < migration.folderMillis) {
              for (const stmt of migration.sql) {
                await tx.execute(sql.raw(stmt));
              }
              await tx.execute(
                sql`insert into ${sql.identifier(migrationsSchema)}.${sql.identifier(migrationsTable)} ("hash", "created_at") values(${migration.hash}, ${migration.folderMillis})`
              );
            }
          }
        });
      }
      escapeName(name) {
        return `"${name.replace(/"/g, '""')}"`;
      }
      escapeParam(num) {
        return `$${num + 1}`;
      }
      escapeString(str) {
        return `'${str.replace(/'/g, "''")}'`;
      }
      buildWithCTE(queries) {
        if (!queries?.length) return void 0;
        const withSqlChunks = [sql`with `];
        for (const [i, w] of queries.entries()) {
          withSqlChunks.push(sql`${sql.identifier(w._.alias)} as (${w._.sql})`);
          if (i < queries.length - 1) {
            withSqlChunks.push(sql`, `);
          }
        }
        withSqlChunks.push(sql` `);
        return sql.join(withSqlChunks);
      }
      buildDeleteQuery({ table, where, returning, withList }) {
        const withSql = this.buildWithCTE(withList);
        const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const whereSql = where ? sql` where ${where}` : void 0;
        return sql`${withSql}delete from ${table}${whereSql}${returningSql}`;
      }
      buildUpdateSet(table, set) {
        const tableColumns = table[Table.Symbol.Columns];
        const columnNames = Object.keys(tableColumns).filter(
          (colName) => set[colName] !== void 0 || tableColumns[colName]?.onUpdateFn !== void 0
        );
        const setSize = columnNames.length;
        return sql.join(columnNames.flatMap((colName, i) => {
          const col = tableColumns[colName];
          const onUpdateFnResult = col.onUpdateFn?.();
          const value = set[colName] ?? (is(onUpdateFnResult, SQL) ? onUpdateFnResult : sql.param(onUpdateFnResult, col));
          const res = sql`${sql.identifier(this.casing.getColumnCasing(col))} = ${value}`;
          if (i < setSize - 1) {
            return [res, sql.raw(", ")];
          }
          return [res];
        }));
      }
      buildUpdateQuery({ table, set, where, returning, withList, from, joins }) {
        const withSql = this.buildWithCTE(withList);
        const tableName = table[PgTable.Symbol.Name];
        const tableSchema = table[PgTable.Symbol.Schema];
        const origTableName = table[PgTable.Symbol.OriginalName];
        const alias = tableName === origTableName ? void 0 : tableName;
        const tableSql = sql`${tableSchema ? sql`${sql.identifier(tableSchema)}.` : void 0}${sql.identifier(origTableName)}${alias && sql` ${sql.identifier(alias)}`}`;
        const setSql = this.buildUpdateSet(table, set);
        const fromSql = from && sql.join([sql.raw(" from "), this.buildFromTable(from)]);
        const joinsSql = this.buildJoins(joins);
        const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: !from })}` : void 0;
        const whereSql = where ? sql` where ${where}` : void 0;
        return sql`${withSql}update ${tableSql} set ${setSql}${fromSql}${joinsSql}${whereSql}${returningSql}`;
      }
      /**
       * Builds selection SQL with provided fields/expressions
       *
       * Examples:
       *
       * `select <selection> from`
       *
       * `insert ... returning <selection>`
       *
       * If `isSingleTable` is true, then columns won't be prefixed with table name
       */
      buildSelection(fields, { isSingleTable = false } = {}) {
        const columnsLen = fields.length;
        const chunks = fields.flatMap(({ field }, i) => {
          const chunk = [];
          if (is(field, SQL.Aliased) && field.isSelectionField) {
            chunk.push(sql.identifier(field.fieldAlias));
          } else if (is(field, SQL.Aliased) || is(field, SQL)) {
            const query = is(field, SQL.Aliased) ? field.sql : field;
            if (isSingleTable) {
              chunk.push(
                new SQL(
                  query.queryChunks.map((c) => {
                    if (is(c, PgColumn)) {
                      return sql.identifier(this.casing.getColumnCasing(c));
                    }
                    return c;
                  })
                )
              );
            } else {
              chunk.push(query);
            }
            if (is(field, SQL.Aliased)) {
              chunk.push(sql` as ${sql.identifier(field.fieldAlias)}`);
            }
          } else if (is(field, Column)) {
            if (isSingleTable) {
              chunk.push(sql.identifier(this.casing.getColumnCasing(field)));
            } else {
              chunk.push(field);
            }
          } else if (is(field, Subquery)) {
            const entries = Object.entries(field._.selectedFields);
            if (entries.length === 1) {
              const entry = entries[0][1];
              const fieldDecoder = is(entry, SQL) ? entry.decoder : is(entry, Column) ? { mapFromDriverValue: (v) => entry.mapFromDriverValue(v) } : entry.sql.decoder;
              if (fieldDecoder) {
                field._.sql.decoder = fieldDecoder;
              }
            }
            chunk.push(field);
          }
          if (i < columnsLen - 1) {
            chunk.push(sql`, `);
          }
          return chunk;
        });
        return sql.join(chunks);
      }
      buildJoins(joins) {
        if (!joins || joins.length === 0) {
          return void 0;
        }
        const joinsArray = [];
        for (const [index2, joinMeta] of joins.entries()) {
          if (index2 === 0) {
            joinsArray.push(sql` `);
          }
          const table = joinMeta.table;
          const lateralSql = joinMeta.lateral ? sql` lateral` : void 0;
          const onSql = joinMeta.on ? sql` on ${joinMeta.on}` : void 0;
          if (is(table, PgTable)) {
            const tableName = table[PgTable.Symbol.Name];
            const tableSchema = table[PgTable.Symbol.Schema];
            const origTableName = table[PgTable.Symbol.OriginalName];
            const alias = tableName === origTableName ? void 0 : joinMeta.alias;
            joinsArray.push(
              sql`${sql.raw(joinMeta.joinType)} join${lateralSql} ${tableSchema ? sql`${sql.identifier(tableSchema)}.` : void 0}${sql.identifier(origTableName)}${alias && sql` ${sql.identifier(alias)}`}${onSql}`
            );
          } else if (is(table, View)) {
            const viewName = table[ViewBaseConfig].name;
            const viewSchema = table[ViewBaseConfig].schema;
            const origViewName = table[ViewBaseConfig].originalName;
            const alias = viewName === origViewName ? void 0 : joinMeta.alias;
            joinsArray.push(
              sql`${sql.raw(joinMeta.joinType)} join${lateralSql} ${viewSchema ? sql`${sql.identifier(viewSchema)}.` : void 0}${sql.identifier(origViewName)}${alias && sql` ${sql.identifier(alias)}`}${onSql}`
            );
          } else {
            joinsArray.push(
              sql`${sql.raw(joinMeta.joinType)} join${lateralSql} ${table}${onSql}`
            );
          }
          if (index2 < joins.length - 1) {
            joinsArray.push(sql` `);
          }
        }
        return sql.join(joinsArray);
      }
      buildFromTable(table) {
        if (is(table, Table) && table[Table.Symbol.IsAlias]) {
          let fullName = sql`${sql.identifier(table[Table.Symbol.OriginalName])}`;
          if (table[Table.Symbol.Schema]) {
            fullName = sql`${sql.identifier(table[Table.Symbol.Schema])}.${fullName}`;
          }
          return sql`${fullName} ${sql.identifier(table[Table.Symbol.Name])}`;
        }
        return table;
      }
      buildSelectQuery({
        withList,
        fields,
        fieldsFlat,
        where,
        having,
        table,
        joins,
        orderBy,
        groupBy,
        limit,
        offset,
        lockingClause,
        distinct,
        setOperators
      }) {
        const fieldsList = fieldsFlat ?? orderSelectedFields(fields);
        for (const f of fieldsList) {
          if (is(f.field, Column) && getTableName(f.field.table) !== (is(table, Subquery) ? table._.alias : is(table, PgViewBase) ? table[ViewBaseConfig].name : is(table, SQL) ? void 0 : getTableName(table)) && !((table2) => joins?.some(
            ({ alias }) => alias === (table2[Table.Symbol.IsAlias] ? getTableName(table2) : table2[Table.Symbol.BaseName])
          ))(f.field.table)) {
            const tableName = getTableName(f.field.table);
            throw new Error(
              `Your "${f.path.join("->")}" field references a column "${tableName}"."${f.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`
            );
          }
        }
        const isSingleTable = !joins || joins.length === 0;
        const withSql = this.buildWithCTE(withList);
        let distinctSql;
        if (distinct) {
          distinctSql = distinct === true ? sql` distinct` : sql` distinct on (${sql.join(distinct.on, sql`, `)})`;
        }
        const selection = this.buildSelection(fieldsList, { isSingleTable });
        const tableSql = this.buildFromTable(table);
        const joinsSql = this.buildJoins(joins);
        const whereSql = where ? sql` where ${where}` : void 0;
        const havingSql = having ? sql` having ${having}` : void 0;
        let orderBySql;
        if (orderBy && orderBy.length > 0) {
          orderBySql = sql` order by ${sql.join(orderBy, sql`, `)}`;
        }
        let groupBySql;
        if (groupBy && groupBy.length > 0) {
          groupBySql = sql` group by ${sql.join(groupBy, sql`, `)}`;
        }
        const limitSql = typeof limit === "object" || typeof limit === "number" && limit >= 0 ? sql` limit ${limit}` : void 0;
        const offsetSql = offset ? sql` offset ${offset}` : void 0;
        const lockingClauseSql = sql.empty();
        if (lockingClause) {
          const clauseSql = sql` for ${sql.raw(lockingClause.strength)}`;
          if (lockingClause.config.of) {
            clauseSql.append(
              sql` of ${sql.join(
                Array.isArray(lockingClause.config.of) ? lockingClause.config.of : [lockingClause.config.of],
                sql`, `
              )}`
            );
          }
          if (lockingClause.config.noWait) {
            clauseSql.append(sql` nowait`);
          } else if (lockingClause.config.skipLocked) {
            clauseSql.append(sql` skip locked`);
          }
          lockingClauseSql.append(clauseSql);
        }
        const finalQuery = sql`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}${lockingClauseSql}`;
        if (setOperators.length > 0) {
          return this.buildSetOperations(finalQuery, setOperators);
        }
        return finalQuery;
      }
      buildSetOperations(leftSelect, setOperators) {
        const [setOperator, ...rest] = setOperators;
        if (!setOperator) {
          throw new Error("Cannot pass undefined values to any set operator");
        }
        if (rest.length === 0) {
          return this.buildSetOperationQuery({ leftSelect, setOperator });
        }
        return this.buildSetOperations(
          this.buildSetOperationQuery({ leftSelect, setOperator }),
          rest
        );
      }
      buildSetOperationQuery({
        leftSelect,
        setOperator: { type, isAll, rightSelect, limit, orderBy, offset }
      }) {
        const leftChunk = sql`(${leftSelect.getSQL()}) `;
        const rightChunk = sql`(${rightSelect.getSQL()})`;
        let orderBySql;
        if (orderBy && orderBy.length > 0) {
          const orderByValues = [];
          for (const singleOrderBy of orderBy) {
            if (is(singleOrderBy, PgColumn)) {
              orderByValues.push(sql.identifier(singleOrderBy.name));
            } else if (is(singleOrderBy, SQL)) {
              for (let i = 0; i < singleOrderBy.queryChunks.length; i++) {
                const chunk = singleOrderBy.queryChunks[i];
                if (is(chunk, PgColumn)) {
                  singleOrderBy.queryChunks[i] = sql.identifier(chunk.name);
                }
              }
              orderByValues.push(sql`${singleOrderBy}`);
            } else {
              orderByValues.push(sql`${singleOrderBy}`);
            }
          }
          orderBySql = sql` order by ${sql.join(orderByValues, sql`, `)} `;
        }
        const limitSql = typeof limit === "object" || typeof limit === "number" && limit >= 0 ? sql` limit ${limit}` : void 0;
        const operatorChunk = sql.raw(`${type} ${isAll ? "all " : ""}`);
        const offsetSql = offset ? sql` offset ${offset}` : void 0;
        return sql`${leftChunk}${operatorChunk}${rightChunk}${orderBySql}${limitSql}${offsetSql}`;
      }
      buildInsertQuery({ table, values: valuesOrSelect, onConflict, returning, withList, select, overridingSystemValue_ }) {
        const valuesSqlList = [];
        const columns = table[Table.Symbol.Columns];
        const colEntries = Object.entries(columns).filter(([_, col]) => !col.shouldDisableInsert());
        const insertOrder = colEntries.map(
          ([, column]) => sql.identifier(this.casing.getColumnCasing(column))
        );
        if (select) {
          const select2 = valuesOrSelect;
          if (is(select2, SQL)) {
            valuesSqlList.push(select2);
          } else {
            valuesSqlList.push(select2.getSQL());
          }
        } else {
          const values = valuesOrSelect;
          valuesSqlList.push(sql.raw("values "));
          for (const [valueIndex, value] of values.entries()) {
            const valueList = [];
            for (const [fieldName, col] of colEntries) {
              const colValue = value[fieldName];
              if (colValue === void 0 || is(colValue, Param) && colValue.value === void 0) {
                if (col.defaultFn !== void 0) {
                  const defaultFnResult = col.defaultFn();
                  const defaultValue = is(defaultFnResult, SQL) ? defaultFnResult : sql.param(defaultFnResult, col);
                  valueList.push(defaultValue);
                } else if (!col.default && col.onUpdateFn !== void 0) {
                  const onUpdateFnResult = col.onUpdateFn();
                  const newValue = is(onUpdateFnResult, SQL) ? onUpdateFnResult : sql.param(onUpdateFnResult, col);
                  valueList.push(newValue);
                } else {
                  valueList.push(sql`default`);
                }
              } else {
                valueList.push(colValue);
              }
            }
            valuesSqlList.push(valueList);
            if (valueIndex < values.length - 1) {
              valuesSqlList.push(sql`, `);
            }
          }
        }
        const withSql = this.buildWithCTE(withList);
        const valuesSql = sql.join(valuesSqlList);
        const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const onConflictSql = onConflict ? sql` on conflict ${onConflict}` : void 0;
        const overridingSql = overridingSystemValue_ === true ? sql`overriding system value ` : void 0;
        return sql`${withSql}insert into ${table} ${insertOrder} ${overridingSql}${valuesSql}${onConflictSql}${returningSql}`;
      }
      buildRefreshMaterializedViewQuery({ view, concurrently, withNoData }) {
        const concurrentlySql = concurrently ? sql` concurrently` : void 0;
        const withNoDataSql = withNoData ? sql` with no data` : void 0;
        return sql`refresh materialized view${concurrentlySql} ${view}${withNoDataSql}`;
      }
      prepareTyping(encoder) {
        if (is(encoder, PgJsonb) || is(encoder, PgJson)) {
          return "json";
        } else if (is(encoder, PgNumeric)) {
          return "decimal";
        } else if (is(encoder, PgTime)) {
          return "time";
        } else if (is(encoder, PgTimestamp) || is(encoder, PgTimestampString)) {
          return "timestamp";
        } else if (is(encoder, PgDate) || is(encoder, PgDateString)) {
          return "date";
        } else if (is(encoder, PgUUID)) {
          return "uuid";
        } else {
          return "none";
        }
      }
      sqlToQuery(sql2, invokeSource) {
        return sql2.toQuery({
          casing: this.casing,
          escapeName: this.escapeName,
          escapeParam: this.escapeParam,
          escapeString: this.escapeString,
          prepareTyping: this.prepareTyping,
          invokeSource
        });
      }
      // buildRelationalQueryWithPK({
      // 	fullSchema,
      // 	schema,
      // 	tableNamesMap,
      // 	table,
      // 	tableConfig,
      // 	queryConfig: config,
      // 	tableAlias,
      // 	isRoot = false,
      // 	joinOn,
      // }: {
      // 	fullSchema: Record<string, unknown>;
      // 	schema: TablesRelationalConfig;
      // 	tableNamesMap: Record<string, string>;
      // 	table: PgTable;
      // 	tableConfig: TableRelationalConfig;
      // 	queryConfig: true | DBQueryConfig<'many', true>;
      // 	tableAlias: string;
      // 	isRoot?: boolean;
      // 	joinOn?: SQL;
      // }): BuildRelationalQueryResult<PgTable, PgColumn> {
      // 	// For { "<relation>": true }, return a table with selection of all columns
      // 	if (config === true) {
      // 		const selectionEntries = Object.entries(tableConfig.columns);
      // 		const selection: BuildRelationalQueryResult<PgTable, PgColumn>['selection'] = selectionEntries.map((
      // 			[key, value],
      // 		) => ({
      // 			dbKey: value.name,
      // 			tsKey: key,
      // 			field: value as PgColumn,
      // 			relationTableTsKey: undefined,
      // 			isJson: false,
      // 			selection: [],
      // 		}));
      // 		return {
      // 			tableTsKey: tableConfig.tsName,
      // 			sql: table,
      // 			selection,
      // 		};
      // 	}
      // 	// let selection: BuildRelationalQueryResult<PgTable, PgColumn>['selection'] = [];
      // 	// let selectionForBuild = selection;
      // 	const aliasedColumns = Object.fromEntries(
      // 		Object.entries(tableConfig.columns).map(([key, value]) => [key, aliasedTableColumn(value, tableAlias)]),
      // 	);
      // 	const aliasedRelations = Object.fromEntries(
      // 		Object.entries(tableConfig.relations).map(([key, value]) => [key, aliasedRelation(value, tableAlias)]),
      // 	);
      // 	const aliasedFields = Object.assign({}, aliasedColumns, aliasedRelations);
      // 	let where, hasUserDefinedWhere;
      // 	if (config.where) {
      // 		const whereSql = typeof config.where === 'function' ? config.where(aliasedFields, operators) : config.where;
      // 		where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
      // 		hasUserDefinedWhere = !!where;
      // 	}
      // 	where = and(joinOn, where);
      // 	// const fieldsSelection: { tsKey: string; value: PgColumn | SQL.Aliased; isExtra?: boolean }[] = [];
      // 	let joins: Join[] = [];
      // 	let selectedColumns: string[] = [];
      // 	// Figure out which columns to select
      // 	if (config.columns) {
      // 		let isIncludeMode = false;
      // 		for (const [field, value] of Object.entries(config.columns)) {
      // 			if (value === undefined) {
      // 				continue;
      // 			}
      // 			if (field in tableConfig.columns) {
      // 				if (!isIncludeMode && value === true) {
      // 					isIncludeMode = true;
      // 				}
      // 				selectedColumns.push(field);
      // 			}
      // 		}
      // 		if (selectedColumns.length > 0) {
      // 			selectedColumns = isIncludeMode
      // 				? selectedColumns.filter((c) => config.columns?.[c] === true)
      // 				: Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
      // 		}
      // 	} else {
      // 		// Select all columns if selection is not specified
      // 		selectedColumns = Object.keys(tableConfig.columns);
      // 	}
      // 	// for (const field of selectedColumns) {
      // 	// 	const column = tableConfig.columns[field]! as PgColumn;
      // 	// 	fieldsSelection.push({ tsKey: field, value: column });
      // 	// }
      // 	let initiallySelectedRelations: {
      // 		tsKey: string;
      // 		queryConfig: true | DBQueryConfig<'many', false>;
      // 		relation: Relation;
      // 	}[] = [];
      // 	// let selectedRelations: BuildRelationalQueryResult<PgTable, PgColumn>['selection'] = [];
      // 	// Figure out which relations to select
      // 	if (config.with) {
      // 		initiallySelectedRelations = Object.entries(config.with)
      // 			.filter((entry): entry is [typeof entry[0], NonNullable<typeof entry[1]>] => !!entry[1])
      // 			.map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey]! }));
      // 	}
      // 	const manyRelations = initiallySelectedRelations.filter((r) =>
      // 		is(r.relation, Many)
      // 		&& (schema[tableNamesMap[r.relation.referencedTable[Table.Symbol.Name]]!]?.primaryKey.length ?? 0) > 0
      // 	);
      // 	// If this is the last Many relation (or there are no Many relations), we are on the innermost subquery level
      // 	const isInnermostQuery = manyRelations.length < 2;
      // 	const selectedExtras: {
      // 		tsKey: string;
      // 		value: SQL.Aliased;
      // 	}[] = [];
      // 	// Figure out which extras to select
      // 	if (isInnermostQuery && config.extras) {
      // 		const extras = typeof config.extras === 'function'
      // 			? config.extras(aliasedFields, { sql })
      // 			: config.extras;
      // 		for (const [tsKey, value] of Object.entries(extras)) {
      // 			selectedExtras.push({
      // 				tsKey,
      // 				value: mapColumnsInAliasedSQLToAlias(value, tableAlias),
      // 			});
      // 		}
      // 	}
      // 	// Transform `fieldsSelection` into `selection`
      // 	// `fieldsSelection` shouldn't be used after this point
      // 	// for (const { tsKey, value, isExtra } of fieldsSelection) {
      // 	// 	selection.push({
      // 	// 		dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey]!.name,
      // 	// 		tsKey,
      // 	// 		field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
      // 	// 		relationTableTsKey: undefined,
      // 	// 		isJson: false,
      // 	// 		isExtra,
      // 	// 		selection: [],
      // 	// 	});
      // 	// }
      // 	let orderByOrig = typeof config.orderBy === 'function'
      // 		? config.orderBy(aliasedFields, orderByOperators)
      // 		: config.orderBy ?? [];
      // 	if (!Array.isArray(orderByOrig)) {
      // 		orderByOrig = [orderByOrig];
      // 	}
      // 	const orderBy = orderByOrig.map((orderByValue) => {
      // 		if (is(orderByValue, Column)) {
      // 			return aliasedTableColumn(orderByValue, tableAlias) as PgColumn;
      // 		}
      // 		return mapColumnsInSQLToAlias(orderByValue, tableAlias);
      // 	});
      // 	const limit = isInnermostQuery ? config.limit : undefined;
      // 	const offset = isInnermostQuery ? config.offset : undefined;
      // 	// For non-root queries without additional config except columns, return a table with selection
      // 	if (
      // 		!isRoot
      // 		&& initiallySelectedRelations.length === 0
      // 		&& selectedExtras.length === 0
      // 		&& !where
      // 		&& orderBy.length === 0
      // 		&& limit === undefined
      // 		&& offset === undefined
      // 	) {
      // 		return {
      // 			tableTsKey: tableConfig.tsName,
      // 			sql: table,
      // 			selection: selectedColumns.map((key) => ({
      // 				dbKey: tableConfig.columns[key]!.name,
      // 				tsKey: key,
      // 				field: tableConfig.columns[key] as PgColumn,
      // 				relationTableTsKey: undefined,
      // 				isJson: false,
      // 				selection: [],
      // 			})),
      // 		};
      // 	}
      // 	const selectedRelationsWithoutPK:
      // 	// Process all relations without primary keys, because they need to be joined differently and will all be on the same query level
      // 	for (
      // 		const {
      // 			tsKey: selectedRelationTsKey,
      // 			queryConfig: selectedRelationConfigValue,
      // 			relation,
      // 		} of initiallySelectedRelations
      // 	) {
      // 		const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
      // 		const relationTableName = relation.referencedTable[Table.Symbol.Name];
      // 		const relationTableTsName = tableNamesMap[relationTableName]!;
      // 		const relationTable = schema[relationTableTsName]!;
      // 		if (relationTable.primaryKey.length > 0) {
      // 			continue;
      // 		}
      // 		const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
      // 		const joinOn = and(
      // 			...normalizedRelation.fields.map((field, i) =>
      // 				eq(
      // 					aliasedTableColumn(normalizedRelation.references[i]!, relationTableAlias),
      // 					aliasedTableColumn(field, tableAlias),
      // 				)
      // 			),
      // 		);
      // 		const builtRelation = this.buildRelationalQueryWithoutPK({
      // 			fullSchema,
      // 			schema,
      // 			tableNamesMap,
      // 			table: fullSchema[relationTableTsName] as PgTable,
      // 			tableConfig: schema[relationTableTsName]!,
      // 			queryConfig: selectedRelationConfigValue,
      // 			tableAlias: relationTableAlias,
      // 			joinOn,
      // 			nestedQueryRelation: relation,
      // 		});
      // 		const field = sql`${sql.identifier(relationTableAlias)}.${sql.identifier('data')}`.as(selectedRelationTsKey);
      // 		joins.push({
      // 			on: sql`true`,
      // 			table: new Subquery(builtRelation.sql as SQL, {}, relationTableAlias),
      // 			alias: relationTableAlias,
      // 			joinType: 'left',
      // 			lateral: true,
      // 		});
      // 		selectedRelations.push({
      // 			dbKey: selectedRelationTsKey,
      // 			tsKey: selectedRelationTsKey,
      // 			field,
      // 			relationTableTsKey: relationTableTsName,
      // 			isJson: true,
      // 			selection: builtRelation.selection,
      // 		});
      // 	}
      // 	const oneRelations = initiallySelectedRelations.filter((r): r is typeof r & { relation: One } =>
      // 		is(r.relation, One)
      // 	);
      // 	// Process all One relations with PKs, because they can all be joined on the same level
      // 	for (
      // 		const {
      // 			tsKey: selectedRelationTsKey,
      // 			queryConfig: selectedRelationConfigValue,
      // 			relation,
      // 		} of oneRelations
      // 	) {
      // 		const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
      // 		const relationTableName = relation.referencedTable[Table.Symbol.Name];
      // 		const relationTableTsName = tableNamesMap[relationTableName]!;
      // 		const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
      // 		const relationTable = schema[relationTableTsName]!;
      // 		if (relationTable.primaryKey.length === 0) {
      // 			continue;
      // 		}
      // 		const joinOn = and(
      // 			...normalizedRelation.fields.map((field, i) =>
      // 				eq(
      // 					aliasedTableColumn(normalizedRelation.references[i]!, relationTableAlias),
      // 					aliasedTableColumn(field, tableAlias),
      // 				)
      // 			),
      // 		);
      // 		const builtRelation = this.buildRelationalQueryWithPK({
      // 			fullSchema,
      // 			schema,
      // 			tableNamesMap,
      // 			table: fullSchema[relationTableTsName] as PgTable,
      // 			tableConfig: schema[relationTableTsName]!,
      // 			queryConfig: selectedRelationConfigValue,
      // 			tableAlias: relationTableAlias,
      // 			joinOn,
      // 		});
      // 		const field = sql`case when ${sql.identifier(relationTableAlias)} is null then null else json_build_array(${
      // 			sql.join(
      // 				builtRelation.selection.map(({ field }) =>
      // 					is(field, SQL.Aliased)
      // 						? sql`${sql.identifier(relationTableAlias)}.${sql.identifier(field.fieldAlias)}`
      // 						: is(field, Column)
      // 						? aliasedTableColumn(field, relationTableAlias)
      // 						: field
      // 				),
      // 				sql`, `,
      // 			)
      // 		}) end`.as(selectedRelationTsKey);
      // 		const isLateralJoin = is(builtRelation.sql, SQL);
      // 		joins.push({
      // 			on: isLateralJoin ? sql`true` : joinOn,
      // 			table: is(builtRelation.sql, SQL)
      // 				? new Subquery(builtRelation.sql, {}, relationTableAlias)
      // 				: aliasedTable(builtRelation.sql, relationTableAlias),
      // 			alias: relationTableAlias,
      // 			joinType: 'left',
      // 			lateral: is(builtRelation.sql, SQL),
      // 		});
      // 		selectedRelations.push({
      // 			dbKey: selectedRelationTsKey,
      // 			tsKey: selectedRelationTsKey,
      // 			field,
      // 			relationTableTsKey: relationTableTsName,
      // 			isJson: true,
      // 			selection: builtRelation.selection,
      // 		});
      // 	}
      // 	let distinct: PgSelectConfig['distinct'];
      // 	let tableFrom: PgTable | Subquery = table;
      // 	// Process first Many relation - each one requires a nested subquery
      // 	const manyRelation = manyRelations[0];
      // 	if (manyRelation) {
      // 		const {
      // 			tsKey: selectedRelationTsKey,
      // 			queryConfig: selectedRelationQueryConfig,
      // 			relation,
      // 		} = manyRelation;
      // 		distinct = {
      // 			on: tableConfig.primaryKey.map((c) => aliasedTableColumn(c as PgColumn, tableAlias)),
      // 		};
      // 		const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
      // 		const relationTableName = relation.referencedTable[Table.Symbol.Name];
      // 		const relationTableTsName = tableNamesMap[relationTableName]!;
      // 		const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
      // 		const joinOn = and(
      // 			...normalizedRelation.fields.map((field, i) =>
      // 				eq(
      // 					aliasedTableColumn(normalizedRelation.references[i]!, relationTableAlias),
      // 					aliasedTableColumn(field, tableAlias),
      // 				)
      // 			),
      // 		);
      // 		const builtRelationJoin = this.buildRelationalQueryWithPK({
      // 			fullSchema,
      // 			schema,
      // 			tableNamesMap,
      // 			table: fullSchema[relationTableTsName] as PgTable,
      // 			tableConfig: schema[relationTableTsName]!,
      // 			queryConfig: selectedRelationQueryConfig,
      // 			tableAlias: relationTableAlias,
      // 			joinOn,
      // 		});
      // 		const builtRelationSelectionField = sql`case when ${
      // 			sql.identifier(relationTableAlias)
      // 		} is null then '[]' else json_agg(json_build_array(${
      // 			sql.join(
      // 				builtRelationJoin.selection.map(({ field }) =>
      // 					is(field, SQL.Aliased)
      // 						? sql`${sql.identifier(relationTableAlias)}.${sql.identifier(field.fieldAlias)}`
      // 						: is(field, Column)
      // 						? aliasedTableColumn(field, relationTableAlias)
      // 						: field
      // 				),
      // 				sql`, `,
      // 			)
      // 		})) over (partition by ${sql.join(distinct.on, sql`, `)}) end`.as(selectedRelationTsKey);
      // 		const isLateralJoin = is(builtRelationJoin.sql, SQL);
      // 		joins.push({
      // 			on: isLateralJoin ? sql`true` : joinOn,
      // 			table: isLateralJoin
      // 				? new Subquery(builtRelationJoin.sql as SQL, {}, relationTableAlias)
      // 				: aliasedTable(builtRelationJoin.sql as PgTable, relationTableAlias),
      // 			alias: relationTableAlias,
      // 			joinType: 'left',
      // 			lateral: isLateralJoin,
      // 		});
      // 		// Build the "from" subquery with the remaining Many relations
      // 		const builtTableFrom = this.buildRelationalQueryWithPK({
      // 			fullSchema,
      // 			schema,
      // 			tableNamesMap,
      // 			table,
      // 			tableConfig,
      // 			queryConfig: {
      // 				...config,
      // 				where: undefined,
      // 				orderBy: undefined,
      // 				limit: undefined,
      // 				offset: undefined,
      // 				with: manyRelations.slice(1).reduce<NonNullable<typeof config['with']>>(
      // 					(result, { tsKey, queryConfig: configValue }) => {
      // 						result[tsKey] = configValue;
      // 						return result;
      // 					},
      // 					{},
      // 				),
      // 			},
      // 			tableAlias,
      // 		});
      // 		selectedRelations.push({
      // 			dbKey: selectedRelationTsKey,
      // 			tsKey: selectedRelationTsKey,
      // 			field: builtRelationSelectionField,
      // 			relationTableTsKey: relationTableTsName,
      // 			isJson: true,
      // 			selection: builtRelationJoin.selection,
      // 		});
      // 		// selection = builtTableFrom.selection.map((item) =>
      // 		// 	is(item.field, SQL.Aliased)
      // 		// 		? { ...item, field: sql`${sql.identifier(tableAlias)}.${sql.identifier(item.field.fieldAlias)}` }
      // 		// 		: item
      // 		// );
      // 		// selectionForBuild = [{
      // 		// 	dbKey: '*',
      // 		// 	tsKey: '*',
      // 		// 	field: sql`${sql.identifier(tableAlias)}.*`,
      // 		// 	selection: [],
      // 		// 	isJson: false,
      // 		// 	relationTableTsKey: undefined,
      // 		// }];
      // 		// const newSelectionItem: (typeof selection)[number] = {
      // 		// 	dbKey: selectedRelationTsKey,
      // 		// 	tsKey: selectedRelationTsKey,
      // 		// 	field,
      // 		// 	relationTableTsKey: relationTableTsName,
      // 		// 	isJson: true,
      // 		// 	selection: builtRelationJoin.selection,
      // 		// };
      // 		// selection.push(newSelectionItem);
      // 		// selectionForBuild.push(newSelectionItem);
      // 		tableFrom = is(builtTableFrom.sql, PgTable)
      // 			? builtTableFrom.sql
      // 			: new Subquery(builtTableFrom.sql, {}, tableAlias);
      // 	}
      // 	if (selectedColumns.length === 0 && selectedRelations.length === 0 && selectedExtras.length === 0) {
      // 		throw new DrizzleError(`No fields selected for table "${tableConfig.tsName}" ("${tableAlias}")`);
      // 	}
      // 	let selection: BuildRelationalQueryResult<PgTable, PgColumn>['selection'];
      // 	function prepareSelectedColumns() {
      // 		return selectedColumns.map((key) => ({
      // 			dbKey: tableConfig.columns[key]!.name,
      // 			tsKey: key,
      // 			field: tableConfig.columns[key] as PgColumn,
      // 			relationTableTsKey: undefined,
      // 			isJson: false,
      // 			selection: [],
      // 		}));
      // 	}
      // 	function prepareSelectedExtras() {
      // 		return selectedExtras.map((item) => ({
      // 			dbKey: item.value.fieldAlias,
      // 			tsKey: item.tsKey,
      // 			field: item.value,
      // 			relationTableTsKey: undefined,
      // 			isJson: false,
      // 			selection: [],
      // 		}));
      // 	}
      // 	if (isRoot) {
      // 		selection = [
      // 			...prepareSelectedColumns(),
      // 			...prepareSelectedExtras(),
      // 		];
      // 	}
      // 	if (hasUserDefinedWhere || orderBy.length > 0) {
      // 		tableFrom = new Subquery(
      // 			this.buildSelectQuery({
      // 				table: is(tableFrom, PgTable) ? aliasedTable(tableFrom, tableAlias) : tableFrom,
      // 				fields: {},
      // 				fieldsFlat: selectionForBuild.map(({ field }) => ({
      // 					path: [],
      // 					field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field,
      // 				})),
      // 				joins,
      // 				distinct,
      // 			}),
      // 			{},
      // 			tableAlias,
      // 		);
      // 		selectionForBuild = selection.map((item) =>
      // 			is(item.field, SQL.Aliased)
      // 				? { ...item, field: sql`${sql.identifier(tableAlias)}.${sql.identifier(item.field.fieldAlias)}` }
      // 				: item
      // 		);
      // 		joins = [];
      // 		distinct = undefined;
      // 	}
      // 	const result = this.buildSelectQuery({
      // 		table: is(tableFrom, PgTable) ? aliasedTable(tableFrom, tableAlias) : tableFrom,
      // 		fields: {},
      // 		fieldsFlat: selectionForBuild.map(({ field }) => ({
      // 			path: [],
      // 			field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field,
      // 		})),
      // 		where,
      // 		limit,
      // 		offset,
      // 		joins,
      // 		orderBy,
      // 		distinct,
      // 	});
      // 	return {
      // 		tableTsKey: tableConfig.tsName,
      // 		sql: result,
      // 		selection,
      // 	};
      // }
      buildRelationalQueryWithoutPK({
        fullSchema,
        schema,
        tableNamesMap,
        table,
        tableConfig,
        queryConfig: config2,
        tableAlias,
        nestedQueryRelation,
        joinOn
      }) {
        let selection = [];
        let limit, offset, orderBy = [], where;
        const joins = [];
        if (config2 === true) {
          const selectionEntries = Object.entries(tableConfig.columns);
          selection = selectionEntries.map(([key, value]) => ({
            dbKey: value.name,
            tsKey: key,
            field: aliasedTableColumn(value, tableAlias),
            relationTableTsKey: void 0,
            isJson: false,
            selection: []
          }));
        } else {
          const aliasedColumns = Object.fromEntries(
            Object.entries(tableConfig.columns).map(([key, value]) => [key, aliasedTableColumn(value, tableAlias)])
          );
          if (config2.where) {
            const whereSql = typeof config2.where === "function" ? config2.where(aliasedColumns, getOperators()) : config2.where;
            where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
          }
          const fieldsSelection = [];
          let selectedColumns = [];
          if (config2.columns) {
            let isIncludeMode = false;
            for (const [field, value] of Object.entries(config2.columns)) {
              if (value === void 0) {
                continue;
              }
              if (field in tableConfig.columns) {
                if (!isIncludeMode && value === true) {
                  isIncludeMode = true;
                }
                selectedColumns.push(field);
              }
            }
            if (selectedColumns.length > 0) {
              selectedColumns = isIncludeMode ? selectedColumns.filter((c) => config2.columns?.[c] === true) : Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
            }
          } else {
            selectedColumns = Object.keys(tableConfig.columns);
          }
          for (const field of selectedColumns) {
            const column = tableConfig.columns[field];
            fieldsSelection.push({ tsKey: field, value: column });
          }
          let selectedRelations = [];
          if (config2.with) {
            selectedRelations = Object.entries(config2.with).filter((entry) => !!entry[1]).map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey] }));
          }
          let extras;
          if (config2.extras) {
            extras = typeof config2.extras === "function" ? config2.extras(aliasedColumns, { sql }) : config2.extras;
            for (const [tsKey, value] of Object.entries(extras)) {
              fieldsSelection.push({
                tsKey,
                value: mapColumnsInAliasedSQLToAlias(value, tableAlias)
              });
            }
          }
          for (const { tsKey, value } of fieldsSelection) {
            selection.push({
              dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
              tsKey,
              field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
              relationTableTsKey: void 0,
              isJson: false,
              selection: []
            });
          }
          let orderByOrig = typeof config2.orderBy === "function" ? config2.orderBy(aliasedColumns, getOrderByOperators()) : config2.orderBy ?? [];
          if (!Array.isArray(orderByOrig)) {
            orderByOrig = [orderByOrig];
          }
          orderBy = orderByOrig.map((orderByValue) => {
            if (is(orderByValue, Column)) {
              return aliasedTableColumn(orderByValue, tableAlias);
            }
            return mapColumnsInSQLToAlias(orderByValue, tableAlias);
          });
          limit = config2.limit;
          offset = config2.offset;
          for (const {
            tsKey: selectedRelationTsKey,
            queryConfig: selectedRelationConfigValue,
            relation
          } of selectedRelations) {
            const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
            const relationTableName = getTableUniqueName(relation.referencedTable);
            const relationTableTsName = tableNamesMap[relationTableName];
            const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
            const joinOn2 = and(
              ...normalizedRelation.fields.map(
                (field2, i) => eq(
                  aliasedTableColumn(normalizedRelation.references[i], relationTableAlias),
                  aliasedTableColumn(field2, tableAlias)
                )
              )
            );
            const builtRelation = this.buildRelationalQueryWithoutPK({
              fullSchema,
              schema,
              tableNamesMap,
              table: fullSchema[relationTableTsName],
              tableConfig: schema[relationTableTsName],
              queryConfig: is(relation, One) ? selectedRelationConfigValue === true ? { limit: 1 } : { ...selectedRelationConfigValue, limit: 1 } : selectedRelationConfigValue,
              tableAlias: relationTableAlias,
              joinOn: joinOn2,
              nestedQueryRelation: relation
            });
            const field = sql`${sql.identifier(relationTableAlias)}.${sql.identifier("data")}`.as(selectedRelationTsKey);
            joins.push({
              on: sql`true`,
              table: new Subquery(builtRelation.sql, {}, relationTableAlias),
              alias: relationTableAlias,
              joinType: "left",
              lateral: true
            });
            selection.push({
              dbKey: selectedRelationTsKey,
              tsKey: selectedRelationTsKey,
              field,
              relationTableTsKey: relationTableTsName,
              isJson: true,
              selection: builtRelation.selection
            });
          }
        }
        if (selection.length === 0) {
          throw new DrizzleError({ message: `No fields selected for table "${tableConfig.tsName}" ("${tableAlias}")` });
        }
        let result;
        where = and(joinOn, where);
        if (nestedQueryRelation) {
          let field = sql`json_build_array(${sql.join(
            selection.map(
              ({ field: field2, tsKey, isJson }) => isJson ? sql`${sql.identifier(`${tableAlias}_${tsKey}`)}.${sql.identifier("data")}` : is(field2, SQL.Aliased) ? field2.sql : field2
            ),
            sql`, `
          )})`;
          if (is(nestedQueryRelation, Many)) {
            field = sql`coalesce(json_agg(${field}${orderBy.length > 0 ? sql` order by ${sql.join(orderBy, sql`, `)}` : void 0}), '[]'::json)`;
          }
          const nestedSelection = [{
            dbKey: "data",
            tsKey: "data",
            field: field.as("data"),
            isJson: true,
            relationTableTsKey: tableConfig.tsName,
            selection
          }];
          const needsSubquery = limit !== void 0 || offset !== void 0 || orderBy.length > 0;
          if (needsSubquery) {
            result = this.buildSelectQuery({
              table: aliasedTable(table, tableAlias),
              fields: {},
              fieldsFlat: [{
                path: [],
                field: sql.raw("*")
              }],
              where,
              limit,
              offset,
              orderBy,
              setOperators: []
            });
            where = void 0;
            limit = void 0;
            offset = void 0;
            orderBy = [];
          } else {
            result = aliasedTable(table, tableAlias);
          }
          result = this.buildSelectQuery({
            table: is(result, PgTable) ? result : new Subquery(result, {}, tableAlias),
            fields: {},
            fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
              path: [],
              field: is(field2, Column) ? aliasedTableColumn(field2, tableAlias) : field2
            })),
            joins,
            where,
            limit,
            offset,
            orderBy,
            setOperators: []
          });
        } else {
          result = this.buildSelectQuery({
            table: aliasedTable(table, tableAlias),
            fields: {},
            fieldsFlat: selection.map(({ field }) => ({
              path: [],
              field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field
            })),
            joins,
            where,
            limit,
            offset,
            orderBy,
            setOperators: []
          });
        }
        return {
          tableTsKey: tableConfig.tsName,
          sql: result,
          selection
        };
      }
    };
  }
});

// node_modules/drizzle-orm/query-builders/query-builder.js
var TypedQueryBuilder;
var init_query_builder = __esm({
  "node_modules/drizzle-orm/query-builders/query-builder.js"() {
    init_entity();
    TypedQueryBuilder = class {
      static [entityKind] = "TypedQueryBuilder";
      /** @internal */
      getSelectedFields() {
        return this._.selectedFields;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/query-builders/select.js
function createSetOperator(type, isAll) {
  return (leftSelect, rightSelect, ...restSelects) => {
    const setOperators = [rightSelect, ...restSelects].map((select) => ({
      type,
      isAll,
      rightSelect: select
    }));
    for (const setOperator of setOperators) {
      if (!haveSameKeys(leftSelect.getSelectedFields(), setOperator.rightSelect.getSelectedFields())) {
        throw new Error(
          "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
        );
      }
    }
    return leftSelect.addSetOperators(setOperators);
  };
}
var PgSelectBuilder, PgSelectQueryBuilderBase, PgSelectBase, getPgSetOperators, union, unionAll, intersect, intersectAll, except, exceptAll;
var init_select2 = __esm({
  "node_modules/drizzle-orm/pg-core/query-builders/select.js"() {
    init_entity();
    init_view_base();
    init_query_builder();
    init_query_promise();
    init_selection_proxy();
    init_sql();
    init_subquery();
    init_table();
    init_tracing();
    init_utils();
    init_utils();
    init_view_common();
    init_utils3();
    PgSelectBuilder = class {
      static [entityKind] = "PgSelectBuilder";
      fields;
      session;
      dialect;
      withList = [];
      distinct;
      constructor(config2) {
        this.fields = config2.fields;
        this.session = config2.session;
        this.dialect = config2.dialect;
        if (config2.withList) {
          this.withList = config2.withList;
        }
        this.distinct = config2.distinct;
      }
      authToken;
      /** @internal */
      setToken(token) {
        this.authToken = token;
        return this;
      }
      /**
       * Specify the table, subquery, or other target that you're
       * building a select query against.
       *
       * {@link https://www.postgresql.org/docs/current/sql-select.html#SQL-FROM | Postgres from documentation}
       */
      from(source) {
        const isPartialSelect = !!this.fields;
        const src = source;
        let fields;
        if (this.fields) {
          fields = this.fields;
        } else if (is(src, Subquery)) {
          fields = Object.fromEntries(
            Object.keys(src._.selectedFields).map((key) => [key, src[key]])
          );
        } else if (is(src, PgViewBase)) {
          fields = src[ViewBaseConfig].selectedFields;
        } else if (is(src, SQL)) {
          fields = {};
        } else {
          fields = getTableColumns(src);
        }
        return new PgSelectBase({
          table: src,
          fields,
          isPartialSelect,
          session: this.session,
          dialect: this.dialect,
          withList: this.withList,
          distinct: this.distinct
        }).setToken(this.authToken);
      }
    };
    PgSelectQueryBuilderBase = class extends TypedQueryBuilder {
      static [entityKind] = "PgSelectQueryBuilder";
      _;
      config;
      joinsNotNullableMap;
      tableName;
      isPartialSelect;
      session;
      dialect;
      cacheConfig = void 0;
      usedTables = /* @__PURE__ */ new Set();
      constructor({ table, fields, isPartialSelect, session, dialect, withList, distinct }) {
        super();
        this.config = {
          withList,
          table,
          fields: { ...fields },
          distinct,
          setOperators: []
        };
        this.isPartialSelect = isPartialSelect;
        this.session = session;
        this.dialect = dialect;
        this._ = {
          selectedFields: fields,
          config: this.config
        };
        this.tableName = getTableLikeName(table);
        this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
        for (const item of extractUsedTable(table)) this.usedTables.add(item);
      }
      /** @internal */
      getUsedTables() {
        return [...this.usedTables];
      }
      createJoin(joinType, lateral) {
        return (table, on) => {
          const baseTableName = this.tableName;
          const tableName = getTableLikeName(table);
          for (const item of extractUsedTable(table)) this.usedTables.add(item);
          if (typeof tableName === "string" && this.config.joins?.some((join) => join.alias === tableName)) {
            throw new Error(`Alias "${tableName}" is already used in this query`);
          }
          if (!this.isPartialSelect) {
            if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
              this.config.fields = {
                [baseTableName]: this.config.fields
              };
            }
            if (typeof tableName === "string" && !is(table, SQL)) {
              const selection = is(table, Subquery) ? table._.selectedFields : is(table, View) ? table[ViewBaseConfig].selectedFields : table[Table.Symbol.Columns];
              this.config.fields[tableName] = selection;
            }
          }
          if (typeof on === "function") {
            on = on(
              new Proxy(
                this.config.fields,
                new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
              )
            );
          }
          if (!this.config.joins) {
            this.config.joins = [];
          }
          this.config.joins.push({ on, table, joinType, alias: tableName, lateral });
          if (typeof tableName === "string") {
            switch (joinType) {
              case "left": {
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
              case "right": {
                this.joinsNotNullableMap = Object.fromEntries(
                  Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
                );
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "cross":
              case "inner": {
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "full": {
                this.joinsNotNullableMap = Object.fromEntries(
                  Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
                );
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
            }
          }
          return this;
        };
      }
      /**
       * Executes a `left join` operation by adding another table to the current query.
       *
       * Calling this method associates each row of the table with the corresponding row from the joined table, if a match is found. If no matching row exists, it sets all columns of the joined table to null.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#left-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User; pets: Pet | null; }[] = await db.select()
       *   .from(users)
       *   .leftJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number; petId: number | null; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .leftJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      leftJoin = this.createJoin("left", false);
      /**
       * Executes a `left join lateral` operation by adding subquery to the current query.
       *
       * A `lateral` join allows the right-hand expression to refer to columns from the left-hand side.
       *
       * Calling this method associates each row of the table with the corresponding row from the joined table, if a match is found. If no matching row exists, it sets all columns of the joined table to null.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#left-join-lateral}
       *
       * @param table the subquery to join.
       * @param on the `on` clause.
       */
      leftJoinLateral = this.createJoin("left", true);
      /**
       * Executes a `right join` operation by adding another table to the current query.
       *
       * Calling this method associates each row of the joined table with the corresponding row from the main table, if a match is found. If no matching row exists, it sets all columns of the main table to null.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#right-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User | null; pets: Pet; }[] = await db.select()
       *   .from(users)
       *   .rightJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number | null; petId: number; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .rightJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      rightJoin = this.createJoin("right", false);
      /**
       * Executes an `inner join` operation, creating a new table by combining rows from two tables that have matching values.
       *
       * Calling this method retrieves rows that have corresponding entries in both joined tables. Rows without matching entries in either table are excluded, resulting in a table that includes only matching pairs.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#inner-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
       *   .from(users)
       *   .innerJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .innerJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      innerJoin = this.createJoin("inner", false);
      /**
       * Executes an `inner join lateral` operation, creating a new table by combining rows from two queries that have matching values.
       *
       * A `lateral` join allows the right-hand expression to refer to columns from the left-hand side.
       *
       * Calling this method retrieves rows that have corresponding entries in both joined tables. Rows without matching entries in either table are excluded, resulting in a table that includes only matching pairs.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#inner-join-lateral}
       *
       * @param table the subquery to join.
       * @param on the `on` clause.
       */
      innerJoinLateral = this.createJoin("inner", true);
      /**
       * Executes a `full join` operation by combining rows from two tables into a new table.
       *
       * Calling this method retrieves all rows from both main and joined tables, merging rows with matching values and filling in `null` for non-matching columns.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#full-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User | null; pets: Pet | null; }[] = await db.select()
       *   .from(users)
       *   .fullJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number | null; petId: number | null; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .fullJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      fullJoin = this.createJoin("full", false);
      /**
       * Executes a `cross join` operation by combining rows from two tables into a new table.
       *
       * Calling this method retrieves all rows from both main and joined tables, merging all rows from each table.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#cross-join}
       *
       * @param table the table to join.
       *
       * @example
       *
       * ```ts
       * // Select all users, each user with every pet
       * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
       *   .from(users)
       *   .crossJoin(pets)
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .crossJoin(pets)
       * ```
       */
      crossJoin = this.createJoin("cross", false);
      /**
       * Executes a `cross join lateral` operation by combining rows from two queries into a new table.
       *
       * A `lateral` join allows the right-hand expression to refer to columns from the left-hand side.
       *
       * Calling this method retrieves all rows from both main and joined queries, merging all rows from each query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#cross-join-lateral}
       *
       * @param table the query to join.
       */
      crossJoinLateral = this.createJoin("cross", true);
      createSetOperator(type, isAll) {
        return (rightSelection) => {
          const rightSelect = typeof rightSelection === "function" ? rightSelection(getPgSetOperators()) : rightSelection;
          if (!haveSameKeys(this.getSelectedFields(), rightSelect.getSelectedFields())) {
            throw new Error(
              "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
            );
          }
          this.config.setOperators.push({ type, isAll, rightSelect });
          return this;
        };
      }
      /**
       * Adds `union` set operator to the query.
       *
       * Calling this method will combine the result sets of the `select` statements and remove any duplicate rows that appear across them.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#union}
       *
       * @example
       *
       * ```ts
       * // Select all unique names from customers and users tables
       * await db.select({ name: users.name })
       *   .from(users)
       *   .union(
       *     db.select({ name: customers.name }).from(customers)
       *   );
       * // or
       * import { union } from 'drizzle-orm/pg-core'
       *
       * await union(
       *   db.select({ name: users.name }).from(users),
       *   db.select({ name: customers.name }).from(customers)
       * );
       * ```
       */
      union = this.createSetOperator("union", false);
      /**
       * Adds `union all` set operator to the query.
       *
       * Calling this method will combine the result-set of the `select` statements and keep all duplicate rows that appear across them.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#union-all}
       *
       * @example
       *
       * ```ts
       * // Select all transaction ids from both online and in-store sales
       * await db.select({ transaction: onlineSales.transactionId })
       *   .from(onlineSales)
       *   .unionAll(
       *     db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
       *   );
       * // or
       * import { unionAll } from 'drizzle-orm/pg-core'
       *
       * await unionAll(
       *   db.select({ transaction: onlineSales.transactionId }).from(onlineSales),
       *   db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
       * );
       * ```
       */
      unionAll = this.createSetOperator("union", true);
      /**
       * Adds `intersect` set operator to the query.
       *
       * Calling this method will retain only the rows that are present in both result sets and eliminate duplicates.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#intersect}
       *
       * @example
       *
       * ```ts
       * // Select course names that are offered in both departments A and B
       * await db.select({ courseName: depA.courseName })
       *   .from(depA)
       *   .intersect(
       *     db.select({ courseName: depB.courseName }).from(depB)
       *   );
       * // or
       * import { intersect } from 'drizzle-orm/pg-core'
       *
       * await intersect(
       *   db.select({ courseName: depA.courseName }).from(depA),
       *   db.select({ courseName: depB.courseName }).from(depB)
       * );
       * ```
       */
      intersect = this.createSetOperator("intersect", false);
      /**
       * Adds `intersect all` set operator to the query.
       *
       * Calling this method will retain only the rows that are present in both result sets including all duplicates.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#intersect-all}
       *
       * @example
       *
       * ```ts
       * // Select all products and quantities that are ordered by both regular and VIP customers
       * await db.select({
       *   productId: regularCustomerOrders.productId,
       *   quantityOrdered: regularCustomerOrders.quantityOrdered
       * })
       * .from(regularCustomerOrders)
       * .intersectAll(
       *   db.select({
       *     productId: vipCustomerOrders.productId,
       *     quantityOrdered: vipCustomerOrders.quantityOrdered
       *   })
       *   .from(vipCustomerOrders)
       * );
       * // or
       * import { intersectAll } from 'drizzle-orm/pg-core'
       *
       * await intersectAll(
       *   db.select({
       *     productId: regularCustomerOrders.productId,
       *     quantityOrdered: regularCustomerOrders.quantityOrdered
       *   })
       *   .from(regularCustomerOrders),
       *   db.select({
       *     productId: vipCustomerOrders.productId,
       *     quantityOrdered: vipCustomerOrders.quantityOrdered
       *   })
       *   .from(vipCustomerOrders)
       * );
       * ```
       */
      intersectAll = this.createSetOperator("intersect", true);
      /**
       * Adds `except` set operator to the query.
       *
       * Calling this method will retrieve all unique rows from the left query, except for the rows that are present in the result set of the right query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#except}
       *
       * @example
       *
       * ```ts
       * // Select all courses offered in department A but not in department B
       * await db.select({ courseName: depA.courseName })
       *   .from(depA)
       *   .except(
       *     db.select({ courseName: depB.courseName }).from(depB)
       *   );
       * // or
       * import { except } from 'drizzle-orm/pg-core'
       *
       * await except(
       *   db.select({ courseName: depA.courseName }).from(depA),
       *   db.select({ courseName: depB.courseName }).from(depB)
       * );
       * ```
       */
      except = this.createSetOperator("except", false);
      /**
       * Adds `except all` set operator to the query.
       *
       * Calling this method will retrieve all rows from the left query, except for the rows that are present in the result set of the right query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#except-all}
       *
       * @example
       *
       * ```ts
       * // Select all products that are ordered by regular customers but not by VIP customers
       * await db.select({
       *   productId: regularCustomerOrders.productId,
       *   quantityOrdered: regularCustomerOrders.quantityOrdered,
       * })
       * .from(regularCustomerOrders)
       * .exceptAll(
       *   db.select({
       *     productId: vipCustomerOrders.productId,
       *     quantityOrdered: vipCustomerOrders.quantityOrdered,
       *   })
       *   .from(vipCustomerOrders)
       * );
       * // or
       * import { exceptAll } from 'drizzle-orm/pg-core'
       *
       * await exceptAll(
       *   db.select({
       *     productId: regularCustomerOrders.productId,
       *     quantityOrdered: regularCustomerOrders.quantityOrdered
       *   })
       *   .from(regularCustomerOrders),
       *   db.select({
       *     productId: vipCustomerOrders.productId,
       *     quantityOrdered: vipCustomerOrders.quantityOrdered
       *   })
       *   .from(vipCustomerOrders)
       * );
       * ```
       */
      exceptAll = this.createSetOperator("except", true);
      /** @internal */
      addSetOperators(setOperators) {
        this.config.setOperators.push(...setOperators);
        return this;
      }
      /**
       * Adds a `where` clause to the query.
       *
       * Calling this method will select only those rows that fulfill a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#filtering}
       *
       * @param where the `where` clause.
       *
       * @example
       * You can use conditional operators and `sql function` to filter the rows to be selected.
       *
       * ```ts
       * // Select all cars with green color
       * await db.select().from(cars).where(eq(cars.color, 'green'));
       * // or
       * await db.select().from(cars).where(sql`${cars.color} = 'green'`)
       * ```
       *
       * You can logically combine conditional operators with `and()` and `or()` operators:
       *
       * ```ts
       * // Select all BMW cars with a green color
       * await db.select().from(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
       *
       * // Select all cars with the green or blue color
       * await db.select().from(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
       * ```
       */
      where(where) {
        if (typeof where === "function") {
          where = where(
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
            )
          );
        }
        this.config.where = where;
        return this;
      }
      /**
       * Adds a `having` clause to the query.
       *
       * Calling this method will select only those rows that fulfill a specified condition. It is typically used with aggregate functions to filter the aggregated data based on a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#aggregations}
       *
       * @param having the `having` clause.
       *
       * @example
       *
       * ```ts
       * // Select all brands with more than one car
       * await db.select({
       * 	brand: cars.brand,
       * 	count: sql<number>`cast(count(${cars.id}) as int)`,
       * })
       *   .from(cars)
       *   .groupBy(cars.brand)
       *   .having(({ count }) => gt(count, 1));
       * ```
       */
      having(having) {
        if (typeof having === "function") {
          having = having(
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
            )
          );
        }
        this.config.having = having;
        return this;
      }
      groupBy(...columns) {
        if (typeof columns[0] === "function") {
          const groupBy = columns[0](
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
        } else {
          this.config.groupBy = columns;
        }
        return this;
      }
      orderBy(...columns) {
        if (typeof columns[0] === "function") {
          const orderBy = columns[0](
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
          if (this.config.setOperators.length > 0) {
            this.config.setOperators.at(-1).orderBy = orderByArray;
          } else {
            this.config.orderBy = orderByArray;
          }
        } else {
          const orderByArray = columns;
          if (this.config.setOperators.length > 0) {
            this.config.setOperators.at(-1).orderBy = orderByArray;
          } else {
            this.config.orderBy = orderByArray;
          }
        }
        return this;
      }
      /**
       * Adds a `limit` clause to the query.
       *
       * Calling this method will set the maximum number of rows that will be returned by this query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
       *
       * @param limit the `limit` clause.
       *
       * @example
       *
       * ```ts
       * // Get the first 10 people from this query.
       * await db.select().from(people).limit(10);
       * ```
       */
      limit(limit) {
        if (this.config.setOperators.length > 0) {
          this.config.setOperators.at(-1).limit = limit;
        } else {
          this.config.limit = limit;
        }
        return this;
      }
      /**
       * Adds an `offset` clause to the query.
       *
       * Calling this method will skip a number of rows when returning results from this query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
       *
       * @param offset the `offset` clause.
       *
       * @example
       *
       * ```ts
       * // Get the 10th-20th people from this query.
       * await db.select().from(people).offset(10).limit(10);
       * ```
       */
      offset(offset) {
        if (this.config.setOperators.length > 0) {
          this.config.setOperators.at(-1).offset = offset;
        } else {
          this.config.offset = offset;
        }
        return this;
      }
      /**
       * Adds a `for` clause to the query.
       *
       * Calling this method will specify a lock strength for this query that controls how strictly it acquires exclusive access to the rows being queried.
       *
       * See docs: {@link https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE}
       *
       * @param strength the lock strength.
       * @param config the lock configuration.
       */
      for(strength, config2 = {}) {
        this.config.lockingClause = { strength, config: config2 };
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildSelectQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      as(alias) {
        const usedTables = [];
        usedTables.push(...extractUsedTable(this.config.table));
        if (this.config.joins) {
          for (const it of this.config.joins) usedTables.push(...extractUsedTable(it.table));
        }
        return new Proxy(
          new Subquery(this.getSQL(), this.config.fields, alias, false, [...new Set(usedTables)]),
          new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
        );
      }
      /** @internal */
      getSelectedFields() {
        return new Proxy(
          this.config.fields,
          new SelectionProxyHandler({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
        );
      }
      $dynamic() {
        return this;
      }
      $withCache(config2) {
        this.cacheConfig = config2 === void 0 ? { config: {}, enable: true, autoInvalidate: true } : config2 === false ? { enable: false } : { enable: true, autoInvalidate: true, ...config2 };
        return this;
      }
    };
    PgSelectBase = class extends PgSelectQueryBuilderBase {
      static [entityKind] = "PgSelect";
      /** @internal */
      _prepare(name) {
        const { session, config: config2, dialect, joinsNotNullableMap, authToken, cacheConfig, usedTables } = this;
        if (!session) {
          throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
        }
        const { fields } = config2;
        return tracer.startActiveSpan("drizzle.prepareQuery", () => {
          const fieldsList = orderSelectedFields(fields);
          const query = session.prepareQuery(dialect.sqlToQuery(this.getSQL()), fieldsList, name, true, void 0, {
            type: "select",
            tables: [...usedTables]
          }, cacheConfig);
          query.joinsNotNullableMap = joinsNotNullableMap;
          return query.setToken(authToken);
        });
      }
      /**
       * Create a prepared statement for this query. This allows
       * the database to remember this query for the given session
       * and call it by name, rather than specifying the full query.
       *
       * {@link https://www.postgresql.org/docs/current/sql-prepare.html | Postgres prepare documentation}
       */
      prepare(name) {
        return this._prepare(name);
      }
      authToken;
      /** @internal */
      setToken(token) {
        this.authToken = token;
        return this;
      }
      execute = (placeholderValues) => {
        return tracer.startActiveSpan("drizzle.operation", () => {
          return this._prepare().execute(placeholderValues, this.authToken);
        });
      };
    };
    applyMixins(PgSelectBase, [QueryPromise]);
    getPgSetOperators = () => ({
      union,
      unionAll,
      intersect,
      intersectAll,
      except,
      exceptAll
    });
    union = createSetOperator("union", false);
    unionAll = createSetOperator("union", true);
    intersect = createSetOperator("intersect", false);
    intersectAll = createSetOperator("intersect", true);
    except = createSetOperator("except", false);
    exceptAll = createSetOperator("except", true);
  }
});

// node_modules/drizzle-orm/pg-core/query-builders/query-builder.js
var QueryBuilder;
var init_query_builder2 = __esm({
  "node_modules/drizzle-orm/pg-core/query-builders/query-builder.js"() {
    init_entity();
    init_dialect();
    init_selection_proxy();
    init_subquery();
    init_select2();
    QueryBuilder = class {
      static [entityKind] = "PgQueryBuilder";
      dialect;
      dialectConfig;
      constructor(dialect) {
        this.dialect = is(dialect, PgDialect) ? dialect : void 0;
        this.dialectConfig = is(dialect, PgDialect) ? void 0 : dialect;
      }
      $with = (alias, selection) => {
        const queryBuilder = this;
        const as = (qb) => {
          if (typeof qb === "function") {
            qb = qb(queryBuilder);
          }
          return new Proxy(
            new WithSubquery(
              qb.getSQL(),
              selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}),
              alias,
              true
            ),
            new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
          );
        };
        return { as };
      };
      with(...queries) {
        const self = this;
        function select(fields) {
          return new PgSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            withList: queries
          });
        }
        function selectDistinct(fields) {
          return new PgSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            distinct: true
          });
        }
        function selectDistinctOn(on, fields) {
          return new PgSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            distinct: { on }
          });
        }
        return { select, selectDistinct, selectDistinctOn };
      }
      select(fields) {
        return new PgSelectBuilder({
          fields: fields ?? void 0,
          session: void 0,
          dialect: this.getDialect()
        });
      }
      selectDistinct(fields) {
        return new PgSelectBuilder({
          fields: fields ?? void 0,
          session: void 0,
          dialect: this.getDialect(),
          distinct: true
        });
      }
      selectDistinctOn(on, fields) {
        return new PgSelectBuilder({
          fields: fields ?? void 0,
          session: void 0,
          dialect: this.getDialect(),
          distinct: { on }
        });
      }
      // Lazy load dialect to avoid circular dependency
      getDialect() {
        if (!this.dialect) {
          this.dialect = new PgDialect(this.dialectConfig);
        }
        return this.dialect;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/view.js
function pgViewWithSchema(name, selection, schema) {
  if (selection) {
    return new ManualViewBuilder(name, selection, schema);
  }
  return new ViewBuilder(name, schema);
}
function pgMaterializedViewWithSchema(name, selection, schema) {
  if (selection) {
    return new ManualMaterializedViewBuilder(name, selection, schema);
  }
  return new MaterializedViewBuilder(name, schema);
}
var DefaultViewBuilderCore, ViewBuilder, ManualViewBuilder, MaterializedViewBuilderCore, MaterializedViewBuilder, ManualMaterializedViewBuilder, PgView, PgMaterializedViewConfig, PgMaterializedView;
var init_view = __esm({
  "node_modules/drizzle-orm/pg-core/view.js"() {
    init_entity();
    init_selection_proxy();
    init_utils();
    init_query_builder2();
    init_table2();
    init_view_base();
    init_view_common2();
    DefaultViewBuilderCore = class {
      constructor(name, schema) {
        this.name = name;
        this.schema = schema;
      }
      static [entityKind] = "PgDefaultViewBuilderCore";
      config = {};
      with(config2) {
        this.config.with = config2;
        return this;
      }
    };
    ViewBuilder = class extends DefaultViewBuilderCore {
      static [entityKind] = "PgViewBuilder";
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(new QueryBuilder());
        }
        const selectionProxy = new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        });
        const aliasedSelection = new Proxy(qb.getSelectedFields(), selectionProxy);
        return new Proxy(
          new PgView({
            pgConfig: this.config,
            config: {
              name: this.name,
              schema: this.schema,
              selectedFields: aliasedSelection,
              query: qb.getSQL().inlineParams()
            }
          }),
          selectionProxy
        );
      }
    };
    ManualViewBuilder = class extends DefaultViewBuilderCore {
      static [entityKind] = "PgManualViewBuilder";
      columns;
      constructor(name, columns, schema) {
        super(name, schema);
        this.columns = getTableColumns(pgTable(name, columns));
      }
      existing() {
        return new Proxy(
          new PgView({
            pgConfig: void 0,
            config: {
              name: this.name,
              schema: this.schema,
              selectedFields: this.columns,
              query: void 0
            }
          }),
          new SelectionProxyHandler({
            alias: this.name,
            sqlBehavior: "error",
            sqlAliasedBehavior: "alias",
            replaceOriginalName: true
          })
        );
      }
      as(query) {
        return new Proxy(
          new PgView({
            pgConfig: this.config,
            config: {
              name: this.name,
              schema: this.schema,
              selectedFields: this.columns,
              query: query.inlineParams()
            }
          }),
          new SelectionProxyHandler({
            alias: this.name,
            sqlBehavior: "error",
            sqlAliasedBehavior: "alias",
            replaceOriginalName: true
          })
        );
      }
    };
    MaterializedViewBuilderCore = class {
      constructor(name, schema) {
        this.name = name;
        this.schema = schema;
      }
      static [entityKind] = "PgMaterializedViewBuilderCore";
      config = {};
      using(using) {
        this.config.using = using;
        return this;
      }
      with(config2) {
        this.config.with = config2;
        return this;
      }
      tablespace(tablespace) {
        this.config.tablespace = tablespace;
        return this;
      }
      withNoData() {
        this.config.withNoData = true;
        return this;
      }
    };
    MaterializedViewBuilder = class extends MaterializedViewBuilderCore {
      static [entityKind] = "PgMaterializedViewBuilder";
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(new QueryBuilder());
        }
        const selectionProxy = new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        });
        const aliasedSelection = new Proxy(qb.getSelectedFields(), selectionProxy);
        return new Proxy(
          new PgMaterializedView({
            pgConfig: {
              with: this.config.with,
              using: this.config.using,
              tablespace: this.config.tablespace,
              withNoData: this.config.withNoData
            },
            config: {
              name: this.name,
              schema: this.schema,
              selectedFields: aliasedSelection,
              query: qb.getSQL().inlineParams()
            }
          }),
          selectionProxy
        );
      }
    };
    ManualMaterializedViewBuilder = class extends MaterializedViewBuilderCore {
      static [entityKind] = "PgManualMaterializedViewBuilder";
      columns;
      constructor(name, columns, schema) {
        super(name, schema);
        this.columns = getTableColumns(pgTable(name, columns));
      }
      existing() {
        return new Proxy(
          new PgMaterializedView({
            pgConfig: {
              tablespace: this.config.tablespace,
              using: this.config.using,
              with: this.config.with,
              withNoData: this.config.withNoData
            },
            config: {
              name: this.name,
              schema: this.schema,
              selectedFields: this.columns,
              query: void 0
            }
          }),
          new SelectionProxyHandler({
            alias: this.name,
            sqlBehavior: "error",
            sqlAliasedBehavior: "alias",
            replaceOriginalName: true
          })
        );
      }
      as(query) {
        return new Proxy(
          new PgMaterializedView({
            pgConfig: {
              tablespace: this.config.tablespace,
              using: this.config.using,
              with: this.config.with,
              withNoData: this.config.withNoData
            },
            config: {
              name: this.name,
              schema: this.schema,
              selectedFields: this.columns,
              query: query.inlineParams()
            }
          }),
          new SelectionProxyHandler({
            alias: this.name,
            sqlBehavior: "error",
            sqlAliasedBehavior: "alias",
            replaceOriginalName: true
          })
        );
      }
    };
    PgView = class extends PgViewBase {
      static [entityKind] = "PgView";
      [PgViewConfig];
      constructor({ pgConfig, config: config2 }) {
        super(config2);
        if (pgConfig) {
          this[PgViewConfig] = {
            with: pgConfig.with
          };
        }
      }
    };
    PgMaterializedViewConfig = /* @__PURE__ */ Symbol.for("drizzle:PgMaterializedViewConfig");
    PgMaterializedView = class extends PgViewBase {
      static [entityKind] = "PgMaterializedView";
      [PgMaterializedViewConfig];
      constructor({ pgConfig, config: config2 }) {
        super(config2);
        this[PgMaterializedViewConfig] = {
          with: pgConfig?.with,
          using: pgConfig?.using,
          tablespace: pgConfig?.tablespace,
          withNoData: pgConfig?.withNoData
        };
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/utils.js
function extractUsedTable(table) {
  if (is(table, PgTable)) {
    return [table[Schema] ? `${table[Schema]}.${table[Table.Symbol.BaseName]}` : table[Table.Symbol.BaseName]];
  }
  if (is(table, Subquery)) {
    return table._.usedTables ?? [];
  }
  if (is(table, SQL)) {
    return table.usedTables ?? [];
  }
  return [];
}
var init_utils3 = __esm({
  "node_modules/drizzle-orm/pg-core/utils.js"() {
    init_entity();
    init_table2();
    init_sql();
    init_subquery();
    init_table();
  }
});

// node_modules/drizzle-orm/pg-core/query-builders/delete.js
var PgDeleteBase;
var init_delete = __esm({
  "node_modules/drizzle-orm/pg-core/query-builders/delete.js"() {
    init_entity();
    init_query_promise();
    init_selection_proxy();
    init_table();
    init_tracing();
    init_utils();
    init_utils3();
    PgDeleteBase = class extends QueryPromise {
      constructor(table, session, dialect, withList) {
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = { table, withList };
      }
      static [entityKind] = "PgDelete";
      config;
      cacheConfig;
      /**
       * Adds a `where` clause to the query.
       *
       * Calling this method will delete only those rows that fulfill a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/delete}
       *
       * @param where the `where` clause.
       *
       * @example
       * You can use conditional operators and `sql function` to filter the rows to be deleted.
       *
       * ```ts
       * // Delete all cars with green color
       * await db.delete(cars).where(eq(cars.color, 'green'));
       * // or
       * await db.delete(cars).where(sql`${cars.color} = 'green'`)
       * ```
       *
       * You can logically combine conditional operators with `and()` and `or()` operators:
       *
       * ```ts
       * // Delete all BMW cars with a green color
       * await db.delete(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
       *
       * // Delete all cars with the green or blue color
       * await db.delete(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
       * ```
       */
      where(where) {
        this.config.where = where;
        return this;
      }
      returning(fields = this.config.table[Table.Symbol.Columns]) {
        this.config.returningFields = fields;
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildDeleteQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      /** @internal */
      _prepare(name) {
        return tracer.startActiveSpan("drizzle.prepareQuery", () => {
          return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, name, true, void 0, {
            type: "delete",
            tables: extractUsedTable(this.config.table)
          }, this.cacheConfig);
        });
      }
      prepare(name) {
        return this._prepare(name);
      }
      authToken;
      /** @internal */
      setToken(token) {
        this.authToken = token;
        return this;
      }
      execute = (placeholderValues) => {
        return tracer.startActiveSpan("drizzle.operation", () => {
          return this._prepare().execute(placeholderValues, this.authToken);
        });
      };
      /** @internal */
      getSelectedFields() {
        return this.config.returningFields ? new Proxy(
          this.config.returningFields,
          new SelectionProxyHandler({
            alias: getTableName(this.config.table),
            sqlAliasedBehavior: "alias",
            sqlBehavior: "error"
          })
        ) : void 0;
      }
      $dynamic() {
        return this;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/query-builders/insert.js
var PgInsertBuilder, PgInsertBase;
var init_insert = __esm({
  "node_modules/drizzle-orm/pg-core/query-builders/insert.js"() {
    init_entity();
    init_query_promise();
    init_selection_proxy();
    init_sql();
    init_table();
    init_tracing();
    init_utils();
    init_utils3();
    init_query_builder2();
    PgInsertBuilder = class {
      constructor(table, session, dialect, withList, overridingSystemValue_) {
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.withList = withList;
        this.overridingSystemValue_ = overridingSystemValue_;
      }
      static [entityKind] = "PgInsertBuilder";
      authToken;
      /** @internal */
      setToken(token) {
        this.authToken = token;
        return this;
      }
      overridingSystemValue() {
        this.overridingSystemValue_ = true;
        return this;
      }
      values(values) {
        values = Array.isArray(values) ? values : [values];
        if (values.length === 0) {
          throw new Error("values() must be called with at least one value");
        }
        const mappedValues = values.map((entry) => {
          const result = {};
          const cols = this.table[Table.Symbol.Columns];
          for (const colKey of Object.keys(entry)) {
            const colValue = entry[colKey];
            result[colKey] = is(colValue, SQL) ? colValue : new Param(colValue, cols[colKey]);
          }
          return result;
        });
        return new PgInsertBase(
          this.table,
          mappedValues,
          this.session,
          this.dialect,
          this.withList,
          false,
          this.overridingSystemValue_
        ).setToken(this.authToken);
      }
      select(selectQuery) {
        const select = typeof selectQuery === "function" ? selectQuery(new QueryBuilder()) : selectQuery;
        if (!is(select, SQL) && !haveSameKeys(this.table[Columns], select._.selectedFields)) {
          throw new Error(
            "Insert select error: selected fields are not the same or are in a different order compared to the table definition"
          );
        }
        return new PgInsertBase(this.table, select, this.session, this.dialect, this.withList, true);
      }
    };
    PgInsertBase = class extends QueryPromise {
      constructor(table, values, session, dialect, withList, select, overridingSystemValue_) {
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = { table, values, withList, select, overridingSystemValue_ };
      }
      static [entityKind] = "PgInsert";
      config;
      cacheConfig;
      returning(fields = this.config.table[Table.Symbol.Columns]) {
        this.config.returningFields = fields;
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /**
       * Adds an `on conflict do nothing` clause to the query.
       *
       * Calling this method simply avoids inserting a row as its alternative action.
       *
       * See docs: {@link https://orm.drizzle.team/docs/insert#on-conflict-do-nothing}
       *
       * @param config The `target` and `where` clauses.
       *
       * @example
       * ```ts
       * // Insert one row and cancel the insert if there's a conflict
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoNothing();
       *
       * // Explicitly specify conflict target
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoNothing({ target: cars.id });
       * ```
       */
      onConflictDoNothing(config2 = {}) {
        if (config2.target === void 0) {
          this.config.onConflict = sql`do nothing`;
        } else {
          let targetColumn = "";
          targetColumn = Array.isArray(config2.target) ? config2.target.map((it) => this.dialect.escapeName(this.dialect.casing.getColumnCasing(it))).join(",") : this.dialect.escapeName(this.dialect.casing.getColumnCasing(config2.target));
          const whereSql = config2.where ? sql` where ${config2.where}` : void 0;
          this.config.onConflict = sql`(${sql.raw(targetColumn)})${whereSql} do nothing`;
        }
        return this;
      }
      /**
       * Adds an `on conflict do update` clause to the query.
       *
       * Calling this method will update the existing row that conflicts with the row proposed for insertion as its alternative action.
       *
       * See docs: {@link https://orm.drizzle.team/docs/insert#upserts-and-conflicts}
       *
       * @param config The `target`, `set` and `where` clauses.
       *
       * @example
       * ```ts
       * // Update the row if there's a conflict
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoUpdate({
       *     target: cars.id,
       *     set: { brand: 'Porsche' }
       *   });
       *
       * // Upsert with 'where' clause
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoUpdate({
       *     target: cars.id,
       *     set: { brand: 'newBMW' },
       *     targetWhere: sql`${cars.createdAt} > '2023-01-01'::date`,
       *   });
       * ```
       */
      onConflictDoUpdate(config2) {
        if (config2.where && (config2.targetWhere || config2.setWhere)) {
          throw new Error(
            'You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.'
          );
        }
        const whereSql = config2.where ? sql` where ${config2.where}` : void 0;
        const targetWhereSql = config2.targetWhere ? sql` where ${config2.targetWhere}` : void 0;
        const setWhereSql = config2.setWhere ? sql` where ${config2.setWhere}` : void 0;
        const setSql = this.dialect.buildUpdateSet(this.config.table, mapUpdateSet(this.config.table, config2.set));
        let targetColumn = "";
        targetColumn = Array.isArray(config2.target) ? config2.target.map((it) => this.dialect.escapeName(this.dialect.casing.getColumnCasing(it))).join(",") : this.dialect.escapeName(this.dialect.casing.getColumnCasing(config2.target));
        this.config.onConflict = sql`(${sql.raw(targetColumn)})${targetWhereSql} do update set ${setSql}${whereSql}${setWhereSql}`;
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildInsertQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      /** @internal */
      _prepare(name) {
        return tracer.startActiveSpan("drizzle.prepareQuery", () => {
          return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, name, true, void 0, {
            type: "insert",
            tables: extractUsedTable(this.config.table)
          }, this.cacheConfig);
        });
      }
      prepare(name) {
        return this._prepare(name);
      }
      authToken;
      /** @internal */
      setToken(token) {
        this.authToken = token;
        return this;
      }
      execute = (placeholderValues) => {
        return tracer.startActiveSpan("drizzle.operation", () => {
          return this._prepare().execute(placeholderValues, this.authToken);
        });
      };
      /** @internal */
      getSelectedFields() {
        return this.config.returningFields ? new Proxy(
          this.config.returningFields,
          new SelectionProxyHandler({
            alias: getTableName(this.config.table),
            sqlAliasedBehavior: "alias",
            sqlBehavior: "error"
          })
        ) : void 0;
      }
      $dynamic() {
        return this;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/query-builders/refresh-materialized-view.js
var PgRefreshMaterializedView;
var init_refresh_materialized_view = __esm({
  "node_modules/drizzle-orm/pg-core/query-builders/refresh-materialized-view.js"() {
    init_entity();
    init_query_promise();
    init_tracing();
    PgRefreshMaterializedView = class extends QueryPromise {
      constructor(view, session, dialect) {
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = { view };
      }
      static [entityKind] = "PgRefreshMaterializedView";
      config;
      concurrently() {
        if (this.config.withNoData !== void 0) {
          throw new Error("Cannot use concurrently and withNoData together");
        }
        this.config.concurrently = true;
        return this;
      }
      withNoData() {
        if (this.config.concurrently !== void 0) {
          throw new Error("Cannot use concurrently and withNoData together");
        }
        this.config.withNoData = true;
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildRefreshMaterializedViewQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      /** @internal */
      _prepare(name) {
        return tracer.startActiveSpan("drizzle.prepareQuery", () => {
          return this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), void 0, name, true);
        });
      }
      prepare(name) {
        return this._prepare(name);
      }
      authToken;
      /** @internal */
      setToken(token) {
        this.authToken = token;
        return this;
      }
      execute = (placeholderValues) => {
        return tracer.startActiveSpan("drizzle.operation", () => {
          return this._prepare().execute(placeholderValues, this.authToken);
        });
      };
    };
  }
});

// node_modules/drizzle-orm/pg-core/query-builders/select.types.js
var init_select_types = __esm({
  "node_modules/drizzle-orm/pg-core/query-builders/select.types.js"() {
  }
});

// node_modules/drizzle-orm/pg-core/query-builders/update.js
var PgUpdateBuilder, PgUpdateBase;
var init_update = __esm({
  "node_modules/drizzle-orm/pg-core/query-builders/update.js"() {
    init_entity();
    init_table2();
    init_query_promise();
    init_selection_proxy();
    init_sql();
    init_subquery();
    init_table();
    init_utils();
    init_view_common();
    init_utils3();
    PgUpdateBuilder = class {
      constructor(table, session, dialect, withList) {
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.withList = withList;
      }
      static [entityKind] = "PgUpdateBuilder";
      authToken;
      setToken(token) {
        this.authToken = token;
        return this;
      }
      set(values) {
        return new PgUpdateBase(
          this.table,
          mapUpdateSet(this.table, values),
          this.session,
          this.dialect,
          this.withList
        ).setToken(this.authToken);
      }
    };
    PgUpdateBase = class extends QueryPromise {
      constructor(table, set, session, dialect, withList) {
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = { set, table, withList, joins: [] };
        this.tableName = getTableLikeName(table);
        this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
      }
      static [entityKind] = "PgUpdate";
      config;
      tableName;
      joinsNotNullableMap;
      cacheConfig;
      from(source) {
        const src = source;
        const tableName = getTableLikeName(src);
        if (typeof tableName === "string") {
          this.joinsNotNullableMap[tableName] = true;
        }
        this.config.from = src;
        return this;
      }
      getTableLikeFields(table) {
        if (is(table, PgTable)) {
          return table[Table.Symbol.Columns];
        } else if (is(table, Subquery)) {
          return table._.selectedFields;
        }
        return table[ViewBaseConfig].selectedFields;
      }
      createJoin(joinType) {
        return (table, on) => {
          const tableName = getTableLikeName(table);
          if (typeof tableName === "string" && this.config.joins.some((join) => join.alias === tableName)) {
            throw new Error(`Alias "${tableName}" is already used in this query`);
          }
          if (typeof on === "function") {
            const from = this.config.from && !is(this.config.from, SQL) ? this.getTableLikeFields(this.config.from) : void 0;
            on = on(
              new Proxy(
                this.config.table[Table.Symbol.Columns],
                new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
              ),
              from && new Proxy(
                from,
                new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
              )
            );
          }
          this.config.joins.push({ on, table, joinType, alias: tableName });
          if (typeof tableName === "string") {
            switch (joinType) {
              case "left": {
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
              case "right": {
                this.joinsNotNullableMap = Object.fromEntries(
                  Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
                );
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "inner": {
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "full": {
                this.joinsNotNullableMap = Object.fromEntries(
                  Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
                );
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
            }
          }
          return this;
        };
      }
      leftJoin = this.createJoin("left");
      rightJoin = this.createJoin("right");
      innerJoin = this.createJoin("inner");
      fullJoin = this.createJoin("full");
      /**
       * Adds a 'where' clause to the query.
       *
       * Calling this method will update only those rows that fulfill a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/update}
       *
       * @param where the 'where' clause.
       *
       * @example
       * You can use conditional operators and `sql function` to filter the rows to be updated.
       *
       * ```ts
       * // Update all cars with green color
       * await db.update(cars).set({ color: 'red' })
       *   .where(eq(cars.color, 'green'));
       * // or
       * await db.update(cars).set({ color: 'red' })
       *   .where(sql`${cars.color} = 'green'`)
       * ```
       *
       * You can logically combine conditional operators with `and()` and `or()` operators:
       *
       * ```ts
       * // Update all BMW cars with a green color
       * await db.update(cars).set({ color: 'red' })
       *   .where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
       *
       * // Update all cars with the green or blue color
       * await db.update(cars).set({ color: 'red' })
       *   .where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
       * ```
       */
      where(where) {
        this.config.where = where;
        return this;
      }
      returning(fields) {
        if (!fields) {
          fields = Object.assign({}, this.config.table[Table.Symbol.Columns]);
          if (this.config.from) {
            const tableName = getTableLikeName(this.config.from);
            if (typeof tableName === "string" && this.config.from && !is(this.config.from, SQL)) {
              const fromFields = this.getTableLikeFields(this.config.from);
              fields[tableName] = fromFields;
            }
            for (const join of this.config.joins) {
              const tableName2 = getTableLikeName(join.table);
              if (typeof tableName2 === "string" && !is(join.table, SQL)) {
                const fromFields = this.getTableLikeFields(join.table);
                fields[tableName2] = fromFields;
              }
            }
          }
        }
        this.config.returningFields = fields;
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildUpdateQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      /** @internal */
      _prepare(name) {
        const query = this.session.prepareQuery(this.dialect.sqlToQuery(this.getSQL()), this.config.returning, name, true, void 0, {
          type: "insert",
          tables: extractUsedTable(this.config.table)
        }, this.cacheConfig);
        query.joinsNotNullableMap = this.joinsNotNullableMap;
        return query;
      }
      prepare(name) {
        return this._prepare(name);
      }
      authToken;
      /** @internal */
      setToken(token) {
        this.authToken = token;
        return this;
      }
      execute = (placeholderValues) => {
        return this._prepare().execute(placeholderValues, this.authToken);
      };
      /** @internal */
      getSelectedFields() {
        return this.config.returningFields ? new Proxy(
          this.config.returningFields,
          new SelectionProxyHandler({
            alias: getTableName(this.config.table),
            sqlAliasedBehavior: "alias",
            sqlBehavior: "error"
          })
        ) : void 0;
      }
      $dynamic() {
        return this;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/query-builders/index.js
var init_query_builders = __esm({
  "node_modules/drizzle-orm/pg-core/query-builders/index.js"() {
    init_delete();
    init_insert();
    init_query_builder2();
    init_refresh_materialized_view();
    init_select2();
    init_select_types();
    init_update();
  }
});

// node_modules/drizzle-orm/pg-core/query-builders/count.js
var PgCountBuilder;
var init_count = __esm({
  "node_modules/drizzle-orm/pg-core/query-builders/count.js"() {
    init_entity();
    init_sql();
    PgCountBuilder = class _PgCountBuilder extends SQL {
      constructor(params) {
        super(_PgCountBuilder.buildEmbeddedCount(params.source, params.filters).queryChunks);
        this.params = params;
        this.mapWith(Number);
        this.session = params.session;
        this.sql = _PgCountBuilder.buildCount(
          params.source,
          params.filters
        );
      }
      sql;
      token;
      static [entityKind] = "PgCountBuilder";
      [Symbol.toStringTag] = "PgCountBuilder";
      session;
      static buildEmbeddedCount(source, filters) {
        return sql`(select count(*) from ${source}${sql.raw(" where ").if(filters)}${filters})`;
      }
      static buildCount(source, filters) {
        return sql`select count(*) as count from ${source}${sql.raw(" where ").if(filters)}${filters};`;
      }
      /** @intrnal */
      setToken(token) {
        this.token = token;
        return this;
      }
      then(onfulfilled, onrejected) {
        return Promise.resolve(this.session.count(this.sql, this.token)).then(
          onfulfilled,
          onrejected
        );
      }
      catch(onRejected) {
        return this.then(void 0, onRejected);
      }
      finally(onFinally) {
        return this.then(
          (value) => {
            onFinally?.();
            return value;
          },
          (reason) => {
            onFinally?.();
            throw reason;
          }
        );
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/query-builders/query.js
var RelationalQueryBuilder, PgRelationalQuery;
var init_query = __esm({
  "node_modules/drizzle-orm/pg-core/query-builders/query.js"() {
    init_entity();
    init_query_promise();
    init_relations();
    init_tracing();
    RelationalQueryBuilder = class {
      constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session) {
        this.fullSchema = fullSchema;
        this.schema = schema;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
      }
      static [entityKind] = "PgRelationalQueryBuilder";
      findMany(config2) {
        return new PgRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config2 ? config2 : {},
          "many"
        );
      }
      findFirst(config2) {
        return new PgRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config2 ? { ...config2, limit: 1 } : { limit: 1 },
          "first"
        );
      }
    };
    PgRelationalQuery = class extends QueryPromise {
      constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session, config2, mode) {
        super();
        this.fullSchema = fullSchema;
        this.schema = schema;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
        this.config = config2;
        this.mode = mode;
      }
      static [entityKind] = "PgRelationalQuery";
      /** @internal */
      _prepare(name) {
        return tracer.startActiveSpan("drizzle.prepareQuery", () => {
          const { query, builtQuery } = this._toSQL();
          return this.session.prepareQuery(
            builtQuery,
            void 0,
            name,
            true,
            (rawRows, mapColumnValue) => {
              const rows = rawRows.map(
                (row) => mapRelationalRow(this.schema, this.tableConfig, row, query.selection, mapColumnValue)
              );
              if (this.mode === "first") {
                return rows[0];
              }
              return rows;
            }
          );
        });
      }
      prepare(name) {
        return this._prepare(name);
      }
      _getQuery() {
        return this.dialect.buildRelationalQueryWithoutPK({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName
        });
      }
      /** @internal */
      getSQL() {
        return this._getQuery().sql;
      }
      _toSQL() {
        const query = this._getQuery();
        const builtQuery = this.dialect.sqlToQuery(query.sql);
        return { query, builtQuery };
      }
      toSQL() {
        return this._toSQL().builtQuery;
      }
      authToken;
      /** @internal */
      setToken(token) {
        this.authToken = token;
        return this;
      }
      execute() {
        return tracer.startActiveSpan("drizzle.operation", () => {
          return this._prepare().execute(void 0, this.authToken);
        });
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/query-builders/raw.js
var PgRaw;
var init_raw = __esm({
  "node_modules/drizzle-orm/pg-core/query-builders/raw.js"() {
    init_entity();
    init_query_promise();
    PgRaw = class extends QueryPromise {
      constructor(execute, sql2, query, mapBatchResult) {
        super();
        this.execute = execute;
        this.sql = sql2;
        this.query = query;
        this.mapBatchResult = mapBatchResult;
      }
      static [entityKind] = "PgRaw";
      /** @internal */
      getSQL() {
        return this.sql;
      }
      getQuery() {
        return this.query;
      }
      mapResult(result, isFromBatch) {
        return isFromBatch ? this.mapBatchResult(result) : result;
      }
      _prepare() {
        return this;
      }
      /** @internal */
      isResponseInArrayMode() {
        return false;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/db.js
var PgDatabase;
var init_db = __esm({
  "node_modules/drizzle-orm/pg-core/db.js"() {
    init_entity();
    init_query_builders();
    init_selection_proxy();
    init_sql();
    init_subquery();
    init_count();
    init_query();
    init_raw();
    init_refresh_materialized_view();
    PgDatabase = class {
      constructor(dialect, session, schema) {
        this.dialect = dialect;
        this.session = session;
        this._ = schema ? {
          schema: schema.schema,
          fullSchema: schema.fullSchema,
          tableNamesMap: schema.tableNamesMap,
          session
        } : {
          schema: void 0,
          fullSchema: {},
          tableNamesMap: {},
          session
        };
        this.query = {};
        if (this._.schema) {
          for (const [tableName, columns] of Object.entries(this._.schema)) {
            this.query[tableName] = new RelationalQueryBuilder(
              schema.fullSchema,
              this._.schema,
              this._.tableNamesMap,
              schema.fullSchema[tableName],
              columns,
              dialect,
              session
            );
          }
        }
        this.$cache = { invalidate: async (_params) => {
        } };
      }
      static [entityKind] = "PgDatabase";
      query;
      /**
       * Creates a subquery that defines a temporary named result set as a CTE.
       *
       * It is useful for breaking down complex queries into simpler parts and for reusing the result set in subsequent parts of the query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
       *
       * @param alias The alias for the subquery.
       *
       * Failure to provide an alias will result in a DrizzleTypeError, preventing the subquery from being referenced in other queries.
       *
       * @example
       *
       * ```ts
       * // Create a subquery with alias 'sq' and use it in the select query
       * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
       *
       * const result = await db.with(sq).select().from(sq);
       * ```
       *
       * To select arbitrary SQL values as fields in a CTE and reference them in other CTEs or in the main query, you need to add aliases to them:
       *
       * ```ts
       * // Select an arbitrary SQL value as a field in a CTE and reference it in the main query
       * const sq = db.$with('sq').as(db.select({
       *   name: sql<string>`upper(${users.name})`.as('name'),
       * })
       * .from(users));
       *
       * const result = await db.with(sq).select({ name: sq.name }).from(sq);
       * ```
       */
      $with = (alias, selection) => {
        const self = this;
        const as = (qb) => {
          if (typeof qb === "function") {
            qb = qb(new QueryBuilder(self.dialect));
          }
          return new Proxy(
            new WithSubquery(
              qb.getSQL(),
              selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}),
              alias,
              true
            ),
            new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
          );
        };
        return { as };
      };
      $count(source, filters) {
        return new PgCountBuilder({ source, filters, session: this.session });
      }
      $cache;
      /**
       * Incorporates a previously defined CTE (using `$with`) into the main query.
       *
       * This method allows the main query to reference a temporary named result set.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
       *
       * @param queries The CTEs to incorporate into the main query.
       *
       * @example
       *
       * ```ts
       * // Define a subquery 'sq' as a CTE using $with
       * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
       *
       * // Incorporate the CTE 'sq' into the main query and select from it
       * const result = await db.with(sq).select().from(sq);
       * ```
       */
      with(...queries) {
        const self = this;
        function select(fields) {
          return new PgSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries
          });
        }
        function selectDistinct(fields) {
          return new PgSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries,
            distinct: true
          });
        }
        function selectDistinctOn(on, fields) {
          return new PgSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries,
            distinct: { on }
          });
        }
        function update(table) {
          return new PgUpdateBuilder(table, self.session, self.dialect, queries);
        }
        function insert(table) {
          return new PgInsertBuilder(table, self.session, self.dialect, queries);
        }
        function delete_(table) {
          return new PgDeleteBase(table, self.session, self.dialect, queries);
        }
        return { select, selectDistinct, selectDistinctOn, update, insert, delete: delete_ };
      }
      select(fields) {
        return new PgSelectBuilder({
          fields: fields ?? void 0,
          session: this.session,
          dialect: this.dialect
        });
      }
      selectDistinct(fields) {
        return new PgSelectBuilder({
          fields: fields ?? void 0,
          session: this.session,
          dialect: this.dialect,
          distinct: true
        });
      }
      selectDistinctOn(on, fields) {
        return new PgSelectBuilder({
          fields: fields ?? void 0,
          session: this.session,
          dialect: this.dialect,
          distinct: { on }
        });
      }
      /**
       * Creates an update query.
       *
       * Calling this method without `.where()` clause will update all rows in a table. The `.where()` clause specifies which rows should be updated.
       *
       * Use `.set()` method to specify which values to update.
       *
       * See docs: {@link https://orm.drizzle.team/docs/update}
       *
       * @param table The table to update.
       *
       * @example
       *
       * ```ts
       * // Update all rows in the 'cars' table
       * await db.update(cars).set({ color: 'red' });
       *
       * // Update rows with filters and conditions
       * await db.update(cars).set({ color: 'red' }).where(eq(cars.brand, 'BMW'));
       *
       * // Update with returning clause
       * const updatedCar: Car[] = await db.update(cars)
       *   .set({ color: 'red' })
       *   .where(eq(cars.id, 1))
       *   .returning();
       * ```
       */
      update(table) {
        return new PgUpdateBuilder(table, this.session, this.dialect);
      }
      /**
       * Creates an insert query.
       *
       * Calling this method will create new rows in a table. Use `.values()` method to specify which values to insert.
       *
       * See docs: {@link https://orm.drizzle.team/docs/insert}
       *
       * @param table The table to insert into.
       *
       * @example
       *
       * ```ts
       * // Insert one row
       * await db.insert(cars).values({ brand: 'BMW' });
       *
       * // Insert multiple rows
       * await db.insert(cars).values([{ brand: 'BMW' }, { brand: 'Porsche' }]);
       *
       * // Insert with returning clause
       * const insertedCar: Car[] = await db.insert(cars)
       *   .values({ brand: 'BMW' })
       *   .returning();
       * ```
       */
      insert(table) {
        return new PgInsertBuilder(table, this.session, this.dialect);
      }
      /**
       * Creates a delete query.
       *
       * Calling this method without `.where()` clause will delete all rows in a table. The `.where()` clause specifies which rows should be deleted.
       *
       * See docs: {@link https://orm.drizzle.team/docs/delete}
       *
       * @param table The table to delete from.
       *
       * @example
       *
       * ```ts
       * // Delete all rows in the 'cars' table
       * await db.delete(cars);
       *
       * // Delete rows with filters and conditions
       * await db.delete(cars).where(eq(cars.color, 'green'));
       *
       * // Delete with returning clause
       * const deletedCar: Car[] = await db.delete(cars)
       *   .where(eq(cars.id, 1))
       *   .returning();
       * ```
       */
      delete(table) {
        return new PgDeleteBase(table, this.session, this.dialect);
      }
      refreshMaterializedView(view) {
        return new PgRefreshMaterializedView(view, this.session, this.dialect);
      }
      authToken;
      execute(query) {
        const sequel = typeof query === "string" ? sql.raw(query) : query.getSQL();
        const builtQuery = this.dialect.sqlToQuery(sequel);
        const prepared = this.session.prepareQuery(
          builtQuery,
          void 0,
          void 0,
          false
        );
        return new PgRaw(
          () => prepared.execute(void 0, this.authToken),
          sequel,
          builtQuery,
          (result) => prepared.mapResult(result, true)
        );
      }
      transaction(transaction, config2) {
        return this.session.transaction(transaction, config2);
      }
    };
  }
});

// node_modules/drizzle-orm/cache/core/cache.js
async function hashQuery(sql2, params) {
  const dataToHash = `${sql2}-${JSON.stringify(params)}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(dataToHash);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = [...new Uint8Array(hashBuffer)];
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}
var Cache, NoopCache;
var init_cache = __esm({
  "node_modules/drizzle-orm/cache/core/cache.js"() {
    init_entity();
    Cache = class {
      static [entityKind] = "Cache";
    };
    NoopCache = class extends Cache {
      strategy() {
        return "all";
      }
      static [entityKind] = "NoopCache";
      async get(_key) {
        return void 0;
      }
      async put(_hashedQuery, _response, _tables, _config) {
      }
      async onMutate(_params) {
      }
    };
  }
});

// node_modules/drizzle-orm/cache/core/index.js
var init_core = __esm({
  "node_modules/drizzle-orm/cache/core/index.js"() {
    init_cache();
  }
});

// node_modules/drizzle-orm/pg-core/alias.js
var init_alias2 = __esm({
  "node_modules/drizzle-orm/pg-core/alias.js"() {
  }
});

// node_modules/drizzle-orm/pg-core/roles.js
var PgRole;
var init_roles = __esm({
  "node_modules/drizzle-orm/pg-core/roles.js"() {
    init_entity();
    PgRole = class {
      constructor(name, config2) {
        this.name = name;
        if (config2) {
          this.createDb = config2.createDb;
          this.createRole = config2.createRole;
          this.inherit = config2.inherit;
        }
      }
      static [entityKind] = "PgRole";
      /** @internal */
      _existing;
      /** @internal */
      createDb;
      /** @internal */
      createRole;
      /** @internal */
      inherit;
      existing() {
        this._existing = true;
        return this;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/sequence.js
function pgSequenceWithSchema(name, options, schema) {
  return new PgSequence(name, options, schema);
}
var PgSequence;
var init_sequence = __esm({
  "node_modules/drizzle-orm/pg-core/sequence.js"() {
    init_entity();
    PgSequence = class {
      constructor(seqName, seqOptions, schema) {
        this.seqName = seqName;
        this.seqOptions = seqOptions;
        this.schema = schema;
      }
      static [entityKind] = "PgSequence";
    };
  }
});

// node_modules/drizzle-orm/pg-core/schema.js
var PgSchema;
var init_schema = __esm({
  "node_modules/drizzle-orm/pg-core/schema.js"() {
    init_entity();
    init_sql();
    init_enum();
    init_sequence();
    init_table2();
    init_view();
    PgSchema = class {
      constructor(schemaName) {
        this.schemaName = schemaName;
      }
      static [entityKind] = "PgSchema";
      table = (name, columns, extraConfig) => {
        return pgTableWithSchema(name, columns, extraConfig, this.schemaName);
      };
      view = (name, columns) => {
        return pgViewWithSchema(name, columns, this.schemaName);
      };
      materializedView = (name, columns) => {
        return pgMaterializedViewWithSchema(name, columns, this.schemaName);
      };
      enum(enumName, input) {
        return Array.isArray(input) ? pgEnumWithSchema(
          enumName,
          [...input],
          this.schemaName
        ) : pgEnumObjectWithSchema(enumName, input, this.schemaName);
      }
      sequence = (name, options) => {
        return pgSequenceWithSchema(name, options, this.schemaName);
      };
      getSQL() {
        return new SQL([sql.identifier(this.schemaName)]);
      }
      shouldOmitSQLParens() {
        return true;
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/session.js
var PgPreparedQuery, PgSession, PgTransaction;
var init_session = __esm({
  "node_modules/drizzle-orm/pg-core/session.js"() {
    init_cache();
    init_entity();
    init_errors();
    init_sql2();
    init_tracing();
    init_db();
    PgPreparedQuery = class {
      constructor(query, cache, queryMetadata, cacheConfig) {
        this.query = query;
        this.cache = cache;
        this.queryMetadata = queryMetadata;
        this.cacheConfig = cacheConfig;
        if (cache && cache.strategy() === "all" && cacheConfig === void 0) {
          this.cacheConfig = { enable: true, autoInvalidate: true };
        }
        if (!this.cacheConfig?.enable) {
          this.cacheConfig = void 0;
        }
      }
      authToken;
      getQuery() {
        return this.query;
      }
      mapResult(response, _isFromBatch) {
        return response;
      }
      /** @internal */
      setToken(token) {
        this.authToken = token;
        return this;
      }
      static [entityKind] = "PgPreparedQuery";
      /** @internal */
      joinsNotNullableMap;
      /** @internal */
      async queryWithCache(queryString, params, query) {
        if (this.cache === void 0 || is(this.cache, NoopCache) || this.queryMetadata === void 0) {
          try {
            return await query();
          } catch (e) {
            throw new DrizzleQueryError(queryString, params, e);
          }
        }
        if (this.cacheConfig && !this.cacheConfig.enable) {
          try {
            return await query();
          } catch (e) {
            throw new DrizzleQueryError(queryString, params, e);
          }
        }
        if ((this.queryMetadata.type === "insert" || this.queryMetadata.type === "update" || this.queryMetadata.type === "delete") && this.queryMetadata.tables.length > 0) {
          try {
            const [res] = await Promise.all([
              query(),
              this.cache.onMutate({ tables: this.queryMetadata.tables })
            ]);
            return res;
          } catch (e) {
            throw new DrizzleQueryError(queryString, params, e);
          }
        }
        if (!this.cacheConfig) {
          try {
            return await query();
          } catch (e) {
            throw new DrizzleQueryError(queryString, params, e);
          }
        }
        if (this.queryMetadata.type === "select") {
          const fromCache = await this.cache.get(
            this.cacheConfig.tag ?? await hashQuery(queryString, params),
            this.queryMetadata.tables,
            this.cacheConfig.tag !== void 0,
            this.cacheConfig.autoInvalidate
          );
          if (fromCache === void 0) {
            let result;
            try {
              result = await query();
            } catch (e) {
              throw new DrizzleQueryError(queryString, params, e);
            }
            await this.cache.put(
              this.cacheConfig.tag ?? await hashQuery(queryString, params),
              result,
              // make sure we send tables that were used in a query only if user wants to invalidate it on each write
              this.cacheConfig.autoInvalidate ? this.queryMetadata.tables : [],
              this.cacheConfig.tag !== void 0,
              this.cacheConfig.config
            );
            return result;
          }
          return fromCache;
        }
        try {
          return await query();
        } catch (e) {
          throw new DrizzleQueryError(queryString, params, e);
        }
      }
    };
    PgSession = class {
      constructor(dialect) {
        this.dialect = dialect;
      }
      static [entityKind] = "PgSession";
      /** @internal */
      execute(query, token) {
        return tracer.startActiveSpan("drizzle.operation", () => {
          const prepared = tracer.startActiveSpan("drizzle.prepareQuery", () => {
            return this.prepareQuery(
              this.dialect.sqlToQuery(query),
              void 0,
              void 0,
              false
            );
          });
          return prepared.setToken(token).execute(void 0, token);
        });
      }
      all(query) {
        return this.prepareQuery(
          this.dialect.sqlToQuery(query),
          void 0,
          void 0,
          false
        ).all();
      }
      /** @internal */
      async count(sql2, token) {
        const res = await this.execute(sql2, token);
        return Number(
          res[0]["count"]
        );
      }
    };
    PgTransaction = class extends PgDatabase {
      constructor(dialect, session, schema, nestedIndex = 0) {
        super(dialect, session, schema);
        this.schema = schema;
        this.nestedIndex = nestedIndex;
      }
      static [entityKind] = "PgTransaction";
      rollback() {
        throw new TransactionRollbackError();
      }
      /** @internal */
      getTransactionConfigSQL(config2) {
        const chunks = [];
        if (config2.isolationLevel) {
          chunks.push(`isolation level ${config2.isolationLevel}`);
        }
        if (config2.accessMode) {
          chunks.push(config2.accessMode);
        }
        if (typeof config2.deferrable === "boolean") {
          chunks.push(config2.deferrable ? "deferrable" : "not deferrable");
        }
        return sql.raw(chunks.join(" "));
      }
      setTransaction(config2) {
        return this.session.execute(sql`set transaction ${this.getTransactionConfigSQL(config2)}`);
      }
    };
  }
});

// node_modules/drizzle-orm/pg-core/subquery.js
var init_subquery2 = __esm({
  "node_modules/drizzle-orm/pg-core/subquery.js"() {
  }
});

// node_modules/drizzle-orm/pg-core/utils/index.js
var init_utils4 = __esm({
  "node_modules/drizzle-orm/pg-core/utils/index.js"() {
    init_array();
  }
});

// node_modules/drizzle-orm/pg-core/index.js
var init_pg_core = __esm({
  "node_modules/drizzle-orm/pg-core/index.js"() {
    init_alias2();
    init_checks();
    init_columns();
    init_db();
    init_dialect();
    init_foreign_keys();
    init_indexes();
    init_policies();
    init_primary_keys();
    init_query_builders();
    init_roles();
    init_schema();
    init_sequence();
    init_session();
    init_subquery2();
    init_table2();
    init_unique_constraint();
    init_utils3();
    init_utils4();
    init_view_common2();
    init_view();
  }
});

// node_modules/drizzle-orm/node-postgres/session.js
import pg from "pg";
var Pool, types, NodePgPreparedQuery, NodePgSession, NodePgTransaction;
var init_session2 = __esm({
  "node_modules/drizzle-orm/node-postgres/session.js"() {
    init_core();
    init_entity();
    init_logger();
    init_pg_core();
    init_session();
    init_sql();
    init_tracing();
    init_utils();
    ({ Pool, types } = pg);
    NodePgPreparedQuery = class extends PgPreparedQuery {
      constructor(client, queryString, params, logger, cache, queryMetadata, cacheConfig, fields, name, _isResponseInArrayMode, customResultMapper) {
        super({ sql: queryString, params }, cache, queryMetadata, cacheConfig);
        this.client = client;
        this.queryString = queryString;
        this.params = params;
        this.logger = logger;
        this.fields = fields;
        this._isResponseInArrayMode = _isResponseInArrayMode;
        this.customResultMapper = customResultMapper;
        this.rawQueryConfig = {
          name,
          text: queryString,
          types: {
            // @ts-ignore
            getTypeParser: (typeId, format) => {
              if (typeId === types.builtins.TIMESTAMPTZ) {
                return (val) => val;
              }
              if (typeId === types.builtins.TIMESTAMP) {
                return (val) => val;
              }
              if (typeId === types.builtins.DATE) {
                return (val) => val;
              }
              if (typeId === types.builtins.INTERVAL) {
                return (val) => val;
              }
              if (typeId === 1231) {
                return (val) => val;
              }
              if (typeId === 1115) {
                return (val) => val;
              }
              if (typeId === 1185) {
                return (val) => val;
              }
              if (typeId === 1187) {
                return (val) => val;
              }
              if (typeId === 1182) {
                return (val) => val;
              }
              return types.getTypeParser(typeId, format);
            }
          }
        };
        this.queryConfig = {
          name,
          text: queryString,
          rowMode: "array",
          types: {
            // @ts-ignore
            getTypeParser: (typeId, format) => {
              if (typeId === types.builtins.TIMESTAMPTZ) {
                return (val) => val;
              }
              if (typeId === types.builtins.TIMESTAMP) {
                return (val) => val;
              }
              if (typeId === types.builtins.DATE) {
                return (val) => val;
              }
              if (typeId === types.builtins.INTERVAL) {
                return (val) => val;
              }
              if (typeId === 1231) {
                return (val) => val;
              }
              if (typeId === 1115) {
                return (val) => val;
              }
              if (typeId === 1185) {
                return (val) => val;
              }
              if (typeId === 1187) {
                return (val) => val;
              }
              if (typeId === 1182) {
                return (val) => val;
              }
              return types.getTypeParser(typeId, format);
            }
          }
        };
      }
      static [entityKind] = "NodePgPreparedQuery";
      rawQueryConfig;
      queryConfig;
      async execute(placeholderValues = {}) {
        return tracer.startActiveSpan("drizzle.execute", async () => {
          const params = fillPlaceholders(this.params, placeholderValues);
          this.logger.logQuery(this.rawQueryConfig.text, params);
          const { fields, rawQueryConfig: rawQuery, client, queryConfig: query, joinsNotNullableMap, customResultMapper } = this;
          if (!fields && !customResultMapper) {
            return tracer.startActiveSpan("drizzle.driver.execute", async (span) => {
              span?.setAttributes({
                "drizzle.query.name": rawQuery.name,
                "drizzle.query.text": rawQuery.text,
                "drizzle.query.params": JSON.stringify(params)
              });
              return this.queryWithCache(rawQuery.text, params, async () => {
                return await client.query(rawQuery, params);
              });
            });
          }
          const result = await tracer.startActiveSpan("drizzle.driver.execute", (span) => {
            span?.setAttributes({
              "drizzle.query.name": query.name,
              "drizzle.query.text": query.text,
              "drizzle.query.params": JSON.stringify(params)
            });
            return this.queryWithCache(query.text, params, async () => {
              return await client.query(query, params);
            });
          });
          return tracer.startActiveSpan("drizzle.mapResponse", () => {
            return customResultMapper ? customResultMapper(result.rows) : result.rows.map((row) => mapResultRow(fields, row, joinsNotNullableMap));
          });
        });
      }
      all(placeholderValues = {}) {
        return tracer.startActiveSpan("drizzle.execute", () => {
          const params = fillPlaceholders(this.params, placeholderValues);
          this.logger.logQuery(this.rawQueryConfig.text, params);
          return tracer.startActiveSpan("drizzle.driver.execute", (span) => {
            span?.setAttributes({
              "drizzle.query.name": this.rawQueryConfig.name,
              "drizzle.query.text": this.rawQueryConfig.text,
              "drizzle.query.params": JSON.stringify(params)
            });
            return this.queryWithCache(this.rawQueryConfig.text, params, async () => {
              return this.client.query(this.rawQueryConfig, params);
            }).then((result) => result.rows);
          });
        });
      }
      /** @internal */
      isResponseInArrayMode() {
        return this._isResponseInArrayMode;
      }
    };
    NodePgSession = class _NodePgSession extends PgSession {
      constructor(client, dialect, schema, options = {}) {
        super(dialect);
        this.client = client;
        this.schema = schema;
        this.options = options;
        this.logger = options.logger ?? new NoopLogger();
        this.cache = options.cache ?? new NoopCache();
      }
      static [entityKind] = "NodePgSession";
      logger;
      cache;
      prepareQuery(query, fields, name, isResponseInArrayMode, customResultMapper, queryMetadata, cacheConfig) {
        return new NodePgPreparedQuery(
          this.client,
          query.sql,
          query.params,
          this.logger,
          this.cache,
          queryMetadata,
          cacheConfig,
          fields,
          name,
          isResponseInArrayMode,
          customResultMapper
        );
      }
      async transaction(transaction, config2) {
        const isPool = this.client instanceof Pool || Object.getPrototypeOf(this.client).constructor.name.includes("Pool");
        const session = isPool ? new _NodePgSession(await this.client.connect(), this.dialect, this.schema, this.options) : this;
        const tx = new NodePgTransaction(this.dialect, session, this.schema);
        await tx.execute(sql`begin${config2 ? sql` ${tx.getTransactionConfigSQL(config2)}` : void 0}`);
        try {
          const result = await transaction(tx);
          await tx.execute(sql`commit`);
          return result;
        } catch (error) {
          await tx.execute(sql`rollback`);
          throw error;
        } finally {
          if (isPool) session.client.release();
        }
      }
      async count(sql2) {
        const res = await this.execute(sql2);
        return Number(
          res["rows"][0]["count"]
        );
      }
    };
    NodePgTransaction = class _NodePgTransaction extends PgTransaction {
      static [entityKind] = "NodePgTransaction";
      async transaction(transaction) {
        const savepointName = `sp${this.nestedIndex + 1}`;
        const tx = new _NodePgTransaction(
          this.dialect,
          this.session,
          this.schema,
          this.nestedIndex + 1
        );
        await tx.execute(sql.raw(`savepoint ${savepointName}`));
        try {
          const result = await transaction(tx);
          await tx.execute(sql.raw(`release savepoint ${savepointName}`));
          return result;
        } catch (err) {
          await tx.execute(sql.raw(`rollback to savepoint ${savepointName}`));
          throw err;
        }
      }
    };
  }
});

// node_modules/drizzle-orm/node-postgres/driver.js
import pg2 from "pg";
function construct(client, config2 = {}) {
  const dialect = new PgDialect({ casing: config2.casing });
  let logger;
  if (config2.logger === true) {
    logger = new DefaultLogger();
  } else if (config2.logger !== false) {
    logger = config2.logger;
  }
  let schema;
  if (config2.schema) {
    const tablesConfig = extractTablesRelationalConfig(
      config2.schema,
      createTableRelationsHelpers
    );
    schema = {
      fullSchema: config2.schema,
      schema: tablesConfig.tables,
      tableNamesMap: tablesConfig.tableNamesMap
    };
  }
  const driver = new NodePgDriver(client, dialect, { logger, cache: config2.cache });
  const session = driver.createSession(schema);
  const db2 = new NodePgDatabase(dialect, session, schema);
  db2.$client = client;
  db2.$cache = config2.cache;
  if (db2.$cache) {
    db2.$cache["invalidate"] = config2.cache?.onMutate;
  }
  return db2;
}
function drizzle(...params) {
  if (typeof params[0] === "string") {
    const instance = new pg2.Pool({
      connectionString: params[0]
    });
    return construct(instance, params[1]);
  }
  if (isConfig(params[0])) {
    const { connection, client, ...drizzleConfig } = params[0];
    if (client) return construct(client, drizzleConfig);
    const instance = typeof connection === "string" ? new pg2.Pool({
      connectionString: connection
    }) : new pg2.Pool(connection);
    return construct(instance, drizzleConfig);
  }
  return construct(params[0], params[1]);
}
var NodePgDriver, NodePgDatabase;
var init_driver = __esm({
  "node_modules/drizzle-orm/node-postgres/driver.js"() {
    init_entity();
    init_logger();
    init_db();
    init_dialect();
    init_relations();
    init_utils();
    init_session2();
    NodePgDriver = class {
      constructor(client, dialect, options = {}) {
        this.client = client;
        this.dialect = dialect;
        this.options = options;
      }
      static [entityKind] = "NodePgDriver";
      createSession(schema) {
        return new NodePgSession(this.client, this.dialect, schema, {
          logger: this.options.logger,
          cache: this.options.cache
        });
      }
    };
    NodePgDatabase = class extends PgDatabase {
      static [entityKind] = "NodePgDatabase";
    };
    ((drizzle2) => {
      function mock(config2) {
        return construct({}, config2);
      }
      drizzle2.mock = mock;
    })(drizzle || (drizzle = {}));
  }
});

// node_modules/drizzle-orm/node-postgres/index.js
var init_node_postgres = __esm({
  "node_modules/drizzle-orm/node-postgres/index.js"() {
    init_driver();
    init_session2();
  }
});

// src/db/databaseUrl.ts
function describeDatabaseUrl(raw) {
  try {
    const url = new URL(raw);
    const host = url.hostname || "";
    const port = url.port || (url.protocol === "postgresql:" ? "5432" : "");
    const pgbouncer = url.searchParams.get("pgbouncer") === "true" || url.searchParams.get("pgbouncer") === "1";
    const looksLikeSupabaseDirect = /^db\.[a-z0-9]+\.supabase\.co$/i.test(host);
    const looksLikeSupabasePooler = /\.pooler\.supabase\.com$/i.test(host);
    return {
      host,
      port,
      database: url.pathname.replace(/^\//, "") || "postgres",
      pgbouncer,
      looksLikeSupabaseDirect,
      looksLikeSupabasePooler,
      looksLikeTransactionPooler: looksLikeSupabasePooler && (port === "6543" || pgbouncer)
    };
  } catch {
    return {
      host: "(unparseable)",
      port: "",
      database: "",
      pgbouncer: false,
      looksLikeSupabaseDirect: false,
      looksLikeSupabasePooler: false,
      looksLikeTransactionPooler: false
    };
  }
}
function normalizeDatabaseUrl(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;
  try {
    const url = new URL(trimmed);
    const host = url.hostname || "";
    const port = url.port || "";
    const isPooler = /\.pooler\.supabase\.com$/i.test(host);
    if (isPooler && (port === "6543" || !port)) {
      if (!url.port) url.port = "6543";
      if (url.searchParams.get("pgbouncer") !== "true" && url.searchParams.get("pgbouncer") !== "1") {
        url.searchParams.set("pgbouncer", "true");
      }
    }
    return url.toString();
  } catch {
    return trimmed;
  }
}
var init_databaseUrl = __esm({
  "src/db/databaseUrl.ts"() {
  }
});

// src/db/schema.ts
var schema_exports = {};
__export(schema_exports, {
  consultationBookings: () => consultationBookings,
  consultationBookingsRelations: () => consultationBookingsRelations,
  coursePurchases: () => coursePurchases,
  coursePurchasesRelations: () => coursePurchasesRelations,
  courses: () => courses,
  coursesRelations: () => coursesRelations,
  dialoguePurchases: () => dialoguePurchases,
  dialoguePurchasesRelations: () => dialoguePurchasesRelations,
  dialogueSessions: () => dialogueSessions,
  dialogueSessionsRelations: () => dialogueSessionsRelations,
  dispensaProgress: () => dispensaProgress,
  dispensaProgressRelations: () => dispensaProgressRelations,
  dispense: () => dispense,
  dispenseRelations: () => dispenseRelations,
  userNotes: () => userNotes,
  userNotesRelations: () => userNotesRelations,
  users: () => users,
  usersRelations: () => usersRelations
});
var users, courses, dispense, coursePurchases, dispensaProgress, consultationBookings, dialogueSessions, dialoguePurchases, userNotes, usersRelations, coursesRelations, dispenseRelations, coursePurchasesRelations, dispensaProgressRelations, consultationBookingsRelations, dialogueSessionsRelations, dialoguePurchasesRelations, userNotesRelations;
var init_schema2 = __esm({
  "src/db/schema.ts"() {
    init_drizzle_orm();
    init_pg_core();
    users = pgTable("users", {
      id: serial("id").primaryKey(),
      uid: text("uid").notNull().unique(),
      email: text("email").notNull(),
      displayName: text("display_name"),
      phoneWhatsapp: text("phone_whatsapp"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    courses = pgTable("courses", {
      id: serial("id").primaryKey(),
      slug: text("slug").notNull().unique(),
      title: text("title").notNull(),
      subtitle: text("subtitle").notNull(),
      description: text("description").notNull(),
      priceEur: integer("price_eur").notNull(),
      stripePriceId: text("stripe_price_id").notNull(),
      lessonsCount: integer("lessons_count").notNull(),
      totalHours: text("total_hours").notNull(),
      levelLabel: text("level_label").notNull(),
      sortOrder: integer("sort_order").notNull(),
      isPublished: boolean("is_published").default(true).notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    dispense = pgTable(
      "dispense",
      {
        id: serial("id").primaryKey(),
        courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
        moduleNumber: text("module_number").notNull(),
        title: text("title").notNull(),
        subtitle: text("subtitle").notNull(),
        format: text("format").notNull(),
        readingMinutes: integer("reading_minutes").notNull(),
        contentMarkdown: text("content_markdown").notNull(),
        keyTakeaways: text("key_takeaways").notNull(),
        // JSON array string
        sortOrder: integer("sort_order").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull()
      },
      (table) => [
        uniqueIndex("dispense_course_module_idx").on(table.courseId, table.moduleNumber)
      ]
    );
    coursePurchases = pgTable(
      "course_purchases",
      {
        id: serial("id").primaryKey(),
        userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
        courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
        status: text("status").notNull().default("active"),
        // 'active' | 'pending_payment' | 'revoked'
        paymentProvider: text("payment_provider").notNull().default("stripe_checkout"),
        stripeSessionId: text("stripe_session_id"),
        amountPaidEur: integer("amount_paid_eur").notNull(),
        customerName: text("customer_name").notNull(),
        customerPhone: text("customer_phone"),
        purchasedAt: timestamp("purchased_at").defaultNow().notNull()
      },
      (table) => [
        uniqueIndex("course_purchases_user_course_idx").on(table.userId, table.courseId)
      ]
    );
    dispensaProgress = pgTable(
      "dispensa_progress",
      {
        id: serial("id").primaryKey(),
        userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
        dispensaId: integer("dispensa_id").references(() => dispense.id, { onDelete: "cascade" }).notNull(),
        completed: boolean("completed").default(false).notNull(),
        personalNotes: text("personal_notes").default("").notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull()
      },
      (table) => [
        uniqueIndex("dispensa_progress_user_dispensa_idx").on(table.userId, table.dispensaId)
      ]
    );
    consultationBookings = pgTable(
      "consultation_bookings",
      {
        id: serial("id").primaryKey(),
        userId: integer("user_id").references(() => users.id, {
          onDelete: "set null"
        }),
        tariffId: text("tariff_id").notNull(),
        durationMinutes: integer("duration_minutes").notNull(),
        priceEur: integer("price_eur").notNull(),
        scheduledDate: text("scheduled_date").notNull(),
        scheduledTime: text("scheduled_time").notNull(),
        fullName: text("full_name").notNull(),
        email: text("email").notNull(),
        phoneWhatsapp: text("phone_whatsapp").notNull(),
        sessionIntent: text("session_intent").default("").notNull(),
        deontologyAccepted: boolean("deontology_accepted").notNull(),
        mode: text("mode").notNull().default("remote"),
        // studio | remote
        status: text("status").notNull().default("pending_payment"),
        stripeSessionId: text("stripe_session_id"),
        stripePaymentIntentId: text("stripe_payment_intent_id"),
        googleCalendarEventId: text("google_calendar_event_id"),
        paidAt: timestamp("paid_at"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull()
      },
      (table) => [
        uniqueIndex("consultation_bookings_stripe_session_idx").on(
          table.stripeSessionId
        )
      ]
    );
    dialogueSessions = pgTable("dialogue_sessions", {
      id: serial("id").primaryKey(),
      sessionKey: text("session_key").notNull().unique(),
      userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
      freeTrialStartedAt: timestamp("free_trial_started_at"),
      freeTrialExpiresAt: timestamp("free_trial_expires_at"),
      activePassExpiresAt: timestamp("active_pass_expires_at"),
      activePackId: text("active_pack_id"),
      interactionsCount: integer("interactions_count").default(0).notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull()
    });
    dialoguePurchases = pgTable("dialogue_purchases", {
      id: serial("id").primaryKey(),
      dialogueSessionId: integer("dialogue_session_id").references(() => dialogueSessions.id, { onDelete: "cascade" }).notNull(),
      userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
      packId: text("pack_id").notNull(),
      // '5m' | '10m' | '15m'
      durationMinutes: integer("duration_minutes").notNull(),
      priceEur: integer("price_eur").notNull(),
      stripePriceId: text("stripe_price_id").notNull(),
      stripeSessionId: text("stripe_session_id"),
      customerName: text("customer_name").default("").notNull(),
      customerEmail: text("customer_email").default("").notNull(),
      expiresAt: timestamp("expires_at").notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    userNotes = pgTable(
      "user_notes",
      {
        id: serial("id").primaryKey(),
        userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
        title: text("title").default("").notNull(),
        body: text("body").default("").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull()
      },
      (table) => [
        index("user_notes_user_id_idx").on(table.userId)
      ]
    );
    usersRelations = relations(users, ({ many }) => ({
      purchases: many(coursePurchases),
      dispensaProgress: many(dispensaProgress),
      bookings: many(consultationBookings),
      dialogueSessions: many(dialogueSessions),
      dialoguePurchases: many(dialoguePurchases),
      notes: many(userNotes)
    }));
    coursesRelations = relations(courses, ({ many }) => ({
      dispense: many(dispense),
      purchases: many(coursePurchases)
    }));
    dispenseRelations = relations(dispense, ({ one, many }) => ({
      course: one(courses, {
        fields: [dispense.courseId],
        references: [courses.id]
      }),
      progressRecords: many(dispensaProgress)
    }));
    coursePurchasesRelations = relations(coursePurchases, ({ one }) => ({
      user: one(users, {
        fields: [coursePurchases.userId],
        references: [users.id]
      }),
      course: one(courses, {
        fields: [coursePurchases.courseId],
        references: [courses.id]
      })
    }));
    dispensaProgressRelations = relations(dispensaProgress, ({ one }) => ({
      user: one(users, {
        fields: [dispensaProgress.userId],
        references: [users.id]
      }),
      dispensa: one(dispense, {
        fields: [dispensaProgress.dispensaId],
        references: [dispense.id]
      })
    }));
    consultationBookingsRelations = relations(consultationBookings, ({ one }) => ({
      user: one(users, {
        fields: [consultationBookings.userId],
        references: [users.id]
      })
    }));
    dialogueSessionsRelations = relations(dialogueSessions, ({ one, many }) => ({
      user: one(users, {
        fields: [dialogueSessions.userId],
        references: [users.id]
      }),
      purchases: many(dialoguePurchases)
    }));
    dialoguePurchasesRelations = relations(dialoguePurchases, ({ one }) => ({
      session: one(dialogueSessions, {
        fields: [dialoguePurchases.dialogueSessionId],
        references: [dialogueSessions.id]
      }),
      user: one(users, {
        fields: [dialoguePurchases.userId],
        references: [users.id]
      })
    }));
    userNotesRelations = relations(userNotes, ({ one }) => ({
      user: one(users, {
        fields: [userNotes.userId],
        references: [users.id]
      })
    }));
  }
});

// src/db/index.ts
import { Pool as Pool2 } from "pg";
function isDbConnectionFailure(error) {
  if (!error || typeof error !== "object") return false;
  const code = String(error.code || "");
  if (code === "ECONNREFUSED" || code === "ENOTFOUND" || code === "ETIMEDOUT" || code === "ECONNRESET" || code === "EAI_AGAIN" || code === "57P01" || // admin_shutdown
  code === "57P03") {
    return true;
  }
  const message = String(
    error.message || error
  ).toLowerCase();
  return message.includes("timeout exceeded when trying to connect") || message.includes("connection terminated due to connection timeout") || message.includes("connect etimedout") || message.includes("could not connect") || message.includes("connection refused") || message.includes("getaddrinfo");
}
function resetDbPool() {
  if (global._postgresPoolResetting) return;
  global._postgresPoolResetting = true;
  const existing = global._postgresPool;
  global._postgresPool = void 0;
  global._ennamoDb = void 0;
  global._postgresPoolLogged = void 0;
  try {
    if (existing) {
      void existing.end().catch((err) => {
        console.error("SQL pool end after reset failed:", err);
      });
    }
  } finally {
    global._postgresPoolResetting = false;
  }
}
function poolMax() {
  if (process.env.SQL_POOL_MAX) {
    return Number(process.env.SQL_POOL_MAX) || 1;
  }
  if (process.env.VERCEL) return 1;
  return 10;
}
function connectionTimeoutMillis() {
  if (process.env.SQL_CONNECTION_TIMEOUT_MS) {
    const parsed = Number(process.env.SQL_CONNECTION_TIMEOUT_MS);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  if (process.env.VERCEL) return 1e4;
  return 15e3;
}
function idleTimeoutMillis() {
  if (process.env.SQL_IDLE_TIMEOUT_MS) {
    const parsed = Number(process.env.SQL_IDLE_TIMEOUT_MS);
    if (Number.isFinite(parsed) && parsed >= 0) return parsed;
  }
  if (process.env.VERCEL) return 5e3;
  return 1e4;
}
function sslOption() {
  if (process.env.SQL_SSL === "false") return void 0;
  if (process.env.SQL_SSL === "true" || process.env.DATABASE_URL) {
    return { rejectUnauthorized: false };
  }
  return void 0;
}
function getDb() {
  if (!global._ennamoDb) {
    global._ennamoDb = drizzle(createPool(), { schema: schema_exports });
  }
  return global._ennamoDb;
}
var createPool, db;
var init_db2 = __esm({
  "src/db/index.ts"() {
    init_node_postgres();
    init_databaseUrl();
    init_schema2();
    init_databaseUrl();
    createPool = () => {
      if (!global._postgresPool) {
        const rawConnectionString = process.env.DATABASE_URL?.trim();
        const connectionString = rawConnectionString ? normalizeDatabaseUrl(rawConnectionString) : void 0;
        const config2 = {
          max: poolMax(),
          connectionTimeoutMillis: connectionTimeoutMillis(),
          idleTimeoutMillis: idleTimeoutMillis(),
          // Let the Node event loop exit when the only clients are idle (Vercel).
          allowExitOnIdle: Boolean(process.env.VERCEL),
          keepAlive: true,
          ssl: sslOption()
        };
        if (connectionString) {
          config2.connectionString = connectionString;
          if (!global._postgresPoolLogged) {
            global._postgresPoolLogged = true;
            const desc2 = describeDatabaseUrl(connectionString);
            console.info("SQL pool init:", desc2);
            if (desc2.looksLikeSupabaseDirect) {
              console.warn(
                "DATABASE_URL looks like Supabase Direct (db.*.supabase.co). On Vercel prefer Transaction pooler host *.pooler.supabase.com:6543?pgbouncer=true (ENN-65 / ENN-89)."
              );
            } else if (desc2.looksLikeSupabasePooler && !desc2.looksLikeTransactionPooler) {
              console.warn(
                "DATABASE_URL looks like Supabase pooler but not Transaction mode (:6543 + pgbouncer). Session mode (:5432) can exhaust connections on Vercel."
              );
            }
          }
        } else {
          const host = process.env.SQL_HOST;
          config2.host = host;
          config2.user = process.env.SQL_USER;
          config2.password = process.env.SQL_PASSWORD;
          config2.database = process.env.SQL_DB_NAME;
        }
        const pool = new Pool2(config2);
        global._postgresPool = pool;
        pool.on("error", (err) => {
          console.error("Unexpected error on idle SQL pool client:", err);
          if (global._postgresPool === pool) {
            global._postgresPool = void 0;
            global._ennamoDb = void 0;
            global._postgresPoolLogged = void 0;
          }
        });
      }
      return global._postgresPool;
    };
    db = new Proxy({}, {
      get(_target, prop, receiver) {
        const real2 = getDb();
        const value = Reflect.get(real2, prop, receiver);
        return typeof value === "function" ? value.bind(real2) : value;
      }
    });
  }
});

// src/data/courses/arcaniMaggioriDispense.ts
var ARCANI_MAGGIORI_DISPENSE;
var init_arcaniMaggioriDispense = __esm({
  "src/data/courses/arcaniMaggioriDispense.ts"() {
    ARCANI_MAGGIORI_DISPENSE = [
      {
        moduleNumber: "01",
        title: "Architettura e Primo Settenario (0 \u2013 VII)",
        subtitle: "Mappa dei Tre Settenari \xB7 Dal Matto al Carro",
        format: "Dispensa formativa + Esercizi",
        readingMinutes: 40,
        keyTakeaways: [
          "I Tre Settenari come mappa evolutiva dalla materia allo spirito.",
          "Il Matto (0) e la diade Bagatto (I) / Papessa (II).",
          "Imperatrice\u2013Carro (III\u2013VII) con simbologia, senso profondo e chiave previsionale."
        ],
        contentMarkdown: `## Dispensa Formativa \xB7 Arcani Maggiori (Primo Step)

Gli Arcani Maggiori non sono strumenti di divinazione meccanica, bens\xEC una **mappa strutturata** dell'esperienza umana, della psiche e dei cicli evolutivi. Questa dispensa apre il Primo Step di Tarot Italia: dall'architettura dei Tre Settenari al radicamento del Primo Settenario, dal Matto al Carro.

## 1. Architettura Didattica e la Mappa dei Tre Settenari

Il mazzo si articola in **ventidue lame** (dalla carta 0 alla XXI), organizzate in tre grandi cicli di crescita interiore e manifestazione esteriore. Ogni settenario risponde a una precisa fase dell'evoluzione individuale, scandendo il passaggio dalla materia allo spirito.

### Mappa dei Tre Cicli

- **Primo Settenario (0 \u2013 VII)** \u2014 Formazione dell'identit\xE0, radicamento nel mondo fisico, azione concreta e conquista della direzione.
- **Secondo Settenario (VIII \u2013 XIV)** \u2014 Prova etica, maturazione morale, interiorizzazione, transizione e ricerca dell'equilibrio interiore.
- **Terzo Settenario (XV \u2013 XXI)** \u2014 Padronanza spirituale, confronto con l'Ombra, liberazione dai vincoli e compiutezza nel mondo.

## 2. Il Primo Settenario: La Formazione dell'Identit\xE0 (0 \u2013 VII)

Il primo ciclo \xE8 la fase di radicamento e di costruzione della personalit\xE0 cosciente. Attraverso queste prime otto carte, l'individuo impara a gestire le risorse materiali, la creativit\xE0, l'autorit\xE0, la guida etica e la scelta, fino all'affermazione trionfante della propria volont\xE0 disciplinata.

### 0. Il Matto \u2013 L'Inizio Non Condizionato

- **Simbologia ed Essenza**: Il Matto (0) rappresenta la soglia fuori dalla numerazione sequenziale; passo sul precipizio; libert\xE0 assoluta. Precede ogni schema, regola o sovrastruttura mentale: energia pura prima di ogni cristallizzazione materiale.
- **Significato Profondo**: slancio genuino, apertura incondizionata al nuovo, coraggio di slegarsi dai condizionamenti, fiducia nel cammino. Ogni inizio autentico richiede il rischio dell'ignoto e lo spogliamento dalle protezioni superflue.
- **In Chiave Previsionale**: cambiamento improvviso di rotta, partenza imminente, salto di fiducia, novit\xE0 inattesa. Chiede audacia, spontaneit\xE0 e istinto pionieristico, senza garanzie logiche paralizzanti.

{{scheda-visiva:il-matto}}

{{sigillo:il-matto}}

### La Diade Creativa: Il Bagatto (I) e La Papessa (II)

La dinamica iniziale del manifestato divide il cammino tra azione visibile e gestazione interiore.

### 1. Il Bagatto (I) \u2013 L'Iniziativa e il Talento all'Opera

- **Simbologia ed Essenza**: Situato alla guida della numerazione, il Bagatto (o Giocoliere) dispone sul banco di tutti gli strumenti primari (bastoni, coppe, spade e denari). \xC8 il padrone delle risorse operative e delle potenzialit\xE0 materiali per cominciare subito.
- **Significato Profondo**: iniziativa immediata, talento puro, destrezza, attivazione dei processi con ci\xF2 che \xE8 gi\xE0 disponibile, senza attendere condizioni ideali.
- **In Chiave Previsionale**: azione pratica immediata; \xABmettere le mani in pasta\xBB, sfruttare le abilit\xE0 pratiche e concretizzare un progetto o un'azione nei primissimi giorni.

{{scheda-visiva:il-bagatto}}

{{sigillo:il-bagatto}}

### 2. La Papessa (II) \u2013 La Gestazione e la Saggezza del Silenzio

- **Simbologia ed Essenza**: Seduta immobile e velata tra i pilastri del tempio, con il sacro libro chiuso o socchiuso; custodisce la conoscenza sottile senza agire all'esterno.
- **Significato Profondo**: gestazione silenziosa, verit\xE0 intuita prima di essere detta, sapienza del tempo, attesa fertile. Ogni vera creazione richiede raccoglimento e maturazione interiore.
- **In Chiave Previsionale**: non \xE8 il momento di agire o esporre idee; custodire, studiare, riflettere, fare ricerca e lasciare maturare gli eventi in profondit\xE0.

{{scheda-visiva:la-papessa}}

{{sigillo:la-papessa}}

### Dal Fiorire alla Conquista (III \u2013 VII)

La progressione conduce dalla fioritura creativa fino all'accelerazione e alla vittoria della volont\xE0 disciplinata.

### 3. L'Imperatrice (III) \u2013 La Fioritura Creativa e l'Abbondanza

- **Simbologia ed Essenza**: fioritura sensibile, abbondanza generativa, capacit\xE0 di dare forma e vita alle idee con espressivit\xE0, comunicazione e cura fertile dei progetti.
- **Significato Profondo**: vitalit\xE0 rigogliosa, espressione creativa senza vincoli, potere generativo della parola; armonia che trasforma l'impulso in manifestazione ricca.
- **In Chiave Previsionale**: espansione prospera, intese riuscite, fioritura di nuove idee, fecondit\xE0 nei progetti, grande armonia relazionale.

{{scheda-visiva:l-imperatrice}}

{{sigillo:l-imperatrice}}

### 4. L'Imperatore (IV) \u2013 La Stabilit\xE0 Strutturale e il Metodo

- **Simbologia ed Essenza**: autorit\xE0 e concretezza; stabilit\xE0, metodo rigoroso, confini solidi, gestione organizzata del mondo materiale.
- **Significato Profondo**: autorit\xE0 saggia, protezione, governo della realt\xE0 senza tentennamenti; forza strutturale per dare durata e confini certi a quanto creato.
- **In Chiave Previsionale**: consolidamento di progetti lavorativi o finanziari, basi solide, referente autorevole o protettivo, gestione metodica ed efficace della materia.

{{scheda-visiva:l-imperatore}}

{{sigillo:l-imperatore}}

### 5. Il Papa (V) \u2013 Il Patto Etico e la Guida Spettabile

- **Simbologia ed Essenza**: guida spirituale o professionale; maestro che trasmette valori condivisi e facilita l'adesione a regole e principi codificati.
- **Significato Profondo**: patto etico, trasmissione della sapienza, mediazione illuminata; alleanza tra aspirazioni individuali e tradizione o struttura sociale.
- **In Chiave Previsionale**: contratti chiari e trasparenti, mediazioni riuscite, consulenze autorevoli, alleanze basate sulla fiducia, rispetto delle norme etiche.

{{scheda-visiva:il-papa}}

{{sigillo:il-papa}}

### 6. Gli Innamorati (VI) \u2013 Il Bivio Fondamentale e la Scelta del Cuore

- **Simbologia ed Essenza**: la figura umana al bivio, di fronte all'incontro, all'affetto e alla responsabilit\xE0 della decisione.
- **Significato Profondo**: scelta consapevole del cuore e responsabilit\xE0 verso la propria direzione emotiva ed esistenziale; optare con convinzione per una strada escludendo le altre.
- **In Chiave Previsionale**: decisioni sentimentali o professionali ineludibili; scelta d'amore o di valore chiara; allineamento autentico con i desideri profondi.

{{scheda-visiva:gli-amanti}}

{{sigillo:gli-amanti}}

### 7. Il Carro (VII) \u2013 L'Azione Coordinata e la Vittoria Disciplinata

- **Simbologia ed Essenza**: il condottiero guida il Carro trionfale e governa con maestria le forze opposte che muovono il veicolo.
- **Significato Profondo**: azione coordinata, controllo sapiente delle polarit\xE0 energetiche, vittoria grazie a determinazione e rigore.
- **In Chiave Previsionale**: sblocco rapido di trattative o situazioni stagnanti, viaggi, spostamenti materiali, accelerazione decisiva e trionfante verso gli obiettivi.

{{scheda-visiva:il-carro}}

{{sigillo:il-carro}}

### Sintesi Didattica del Modulo 1

1. Il Matto (0) garantisce la libert\xE0 originaria e l'apertura incondizionata al mutamento.
2. La polarit\xE0 Bagatto (I) / Papessa (II) stabilisce l'alternanza tra azione visibile e gestazione intuitiva.
3. Da Imperatrice (III) e Imperatore (IV) si giunge alla guida etica del Papa (V), alla scelta degli Innamorati (VI) e alla spinta del Carro (VII).

### Esercizi Pratici del Primo Settenario

- **Esercizio 1 (Il Matto e il foglio bianco)**: identifica un progetto rinviato e scrivi l'azione minima di coraggio da compiere oggi, senza pianificarla nei dettagli.
- **Esercizio 2 (Bagatto vs Papessa)**: di fronte a un dubbio, estrai una carta. Bagatto \u2192 azione pratica entro 24 ore; Papessa \u2192 tre giorni di silenzio e ascolto prima di decidere.
- **Esercizio 3 (Lettura a due lame)**: combina Il Carro con una lama precedente per interpretare uno sblocco inatteso in ambito lavorativo o personale.
`
      },
      {
        moduleNumber: "02",
        title: "Secondo Settenario: Prova Etica (VIII \u2013 XIV)",
        subtitle: "Giustizia, Eremita, Ruota, Forza, Appeso, Morte, Temperanza",
        format: "Dispensa formativa + Schede Archetipo",
        readingMinutes: 40,
        keyTakeaways: [
          "Dal mondo esterno all\u2019interiorizzazione: maturazione morale e limiti.",
          "Ruota (X) e Forza (XI): mutamento e dominio gentile dell\u2019istinto.",
          "Appeso, Morte e Temperanza come transizione verso il terzo ciclo."
        ],
        contentMarkdown: `## Il Secondo Settenario: La Prova Etica e l'Interiorizzazione (VIII \u2013 XIV)

Se il primo settenario costruisce l'identit\xE0 esterna, il secondo sposta l'asse verso l'interno: maturazione morale, confronto con i limiti, equilibrio e trasformazione profonda.

### 8. La Giustizia (VIII) \u2013 Ordine, Misura e Causa-Effetto

- **Simbologia ed Essenza**: figura regale in trono, spada verticale e bilancia in equilibrio; ordine cosmico, imparzialit\xE0 e linearit\xE0 delle conseguenze.
- **Significato Profondo**: responsabilit\xE0, onest\xE0 intellettuale, equilibrio, rigore etico. Ogni azione genera conseguenza; la chiarezza mentale guida l'emotivit\xE0.
- **In Chiave Previsionale**: questioni legali o burocratiche, contratti equi, necessit\xE0 di fare ordine, risposta meritata e oggettiva.

### 9. L'Eremita (IX) \u2013 Luce Interiore e Tempo della Ricerca

- **Simbologia ed Essenza**: saggio nel mantello, lanterna nella notte; protegge e illumina il cammino.
- **Significato Profondo**: raccoglimento, solitudine rigenerante, ricerca della verit\xE0 interiore, prudenza; distacco temporaneo dal frastuono per trovare risposte autentiche.
- **In Chiave Previsionale**: rallentamento, studio, introspezione, cautela e riserbo, senza affrettare i tempi.

### 10. La Ruota di Fortuna (X) \u2013 Ciclo, Mutamento e Imprevisto

- **Simbologia ed Essenza**: ruota in movimento e figure in evoluzione; cicli vitali e mutevolezza delle circostanze.
- **Significato Profondo**: accettazione del cambiamento, ciclicit\xE0, sblocco della stagnazione; adattarsi con flessibilit\xE0.
- **In Chiave Previsionale**: svolta improvvisa, colpo di scena, nuovo ciclo, ribaltamento rapido di una situazione bloccata.

### 11. La Forza (XI) \u2013 Dominio Istintivo e Coraggio Gentile

- **Simbologia ed Essenza**: una donna apre o chiude con dolcezza le fauci di un leone, senza violenza.
- **Significato Profondo**: dominio delle passioni tramite consapevolezza, coraggio interiore, pazienza, gestione saggia dell'energia; integrare gli impulsi anzich\xE9 reprimerli.
- **In Chiave Previsionale**: superare una prova complessa con determinazione e autocontrollo; armonia nelle tensioni.

### 12. L'Appeso (XII) \u2013 Sosta Volontaria e Cambio di Prospettiva

- **Simbologia ed Essenza**: figura a testa in gi\xF9, serena; l'energia fluisce verso l'alto.
- **Significato Profondo**: sosta necessaria, sacrificio come \xABrendere sacro\xBB, rinuncia al controllo rigido, capovolgimento di sguardo.
- **In Chiave Previsionale**: blocco o attesa utile a riconsiderare le priorit\xE0, lasciando andare la fretta e accettando la pausa.

### 13. L'Arcano Senza Nome / La Morte (XIII) \u2013 Trasmutazione e Taglio Netto

- **Simbologia ed Essenza**: scheletro che falcia; dal terreno emergono germogli; potatura indispensabile alla vita.
- **Significato Profondo**: fine radicale di un ciclo, distacco da ci\xF2 che \xE8 obsoleto, trasformazione e rinascita per fare spazio al nuovo.
- **In Chiave Previsionale**: chiusura netta e cambiamento drastico; se accolto senza resistenza, apre a rinnovamento totale.

### 14. La Temperanza (XIV) \u2013 Alchimia Quotidiana e Moderazione

- **Simbologia ed Essenza**: figura alata che travasa liquido tra due vasi; flusso continuo di armonia.
- **Significato Profondo**: misura, guarigione, pazienza alchemica, riconciliazione, compromesso e pace interiore.
- **In Chiave Previsionale**: risoluzione pacifica, cure efficaci, tempi di recupero fluidi, fase di stabilizzazione in cui regna la cooperazione.

### Sintesi Didattica del Modulo 2

1. Dalla Giustizia (VIII) all'Eremita (IX): maturazione morale e ascolto della coscienza.
2. Ruota (X) e Forza (XI): accettazione del mutamento e dominio saggio dell'energia.
3. Appeso (XII), Morte (XIII) e Temperanza (XIV): transizione emotiva ed etica verso il terzo settenario.
`
      },
      {
        moduleNumber: "03",
        title: "Terzo Settenario: Ombra e Compiutezza (XV \u2013 XXI)",
        subtitle: "Dal Diavolo e la Torre fino a Sole, Giudizio e Mondo",
        format: "Dispensa formativa + Atlante Simbolico",
        readingMinutes: 40,
        keyTakeaways: [
          "Diavolo (XV) e Torre (XVI): Ombra, crollo e liberazione.",
          "Stelle, Luna e Sole: speranza, inconscio e chiarezza visibile.",
          "Giudizio (XX) e Mondo (XXI): risveglio e trionfo finale."
        ],
        contentMarkdown: `## Il Terzo Settenario: Padronanza Spirituale e Compiutezza (XV \u2013 XXI)

Nel terzo settenario l'individuo si confronta con le grandi forze universali: supera le illusioni dell'Ombra, abbatte le false certezze e realizza il proprio potenziale interiore ed esteriore.

### 15. Il Diavolo (XV) \u2013 Ombra, Materia e Fascino del Potere

- **Simbologia ed Essenza**: creatura alata su due figure legate in modo blando ma consenziente.
- **Significato Profondo**: confronto con l'Ombra, attaccamento alla materia, passioni, denaro, dipendenze, falsi poteri. Riconoscere i desideri inconsci per riprendere il controllo.
- **In Chiave Previsionale**: passioni forti, dinamiche di potere o manipolazione, profitto materiale; necessit\xE0 di liberarsi da legami tossici.

### 16. La Torre (XVI) \u2013 Folgore, Crollo e Liberazione

- **Simbologia ed Essenza**: torre colpita dal fulmine; corona che salta; figure che precipitano tra scintille.
- **Significato Profondo**: rottura delle false certezze, crollo di strutture non pi\xF9 aderenti alla verit\xE0, liberazione catartica attraverso la crisi.
- **In Chiave Previsionale**: cambiamento drastico e inatteso che rompe la stagnazione e libera nuove energie.

### 17. Le Stelle (XVII) \u2013 Speranza, Ispirazione e Guarigione

- **Simbologia ed Essenza**: figura nuda che versa linfa su terra e acqua, sotto stelle radiose.
- **Significato Profondo**: guida celeste, fiducia, chiarezza d'intenti, ispirazione, guarigione dopo la Torre.
- **In Chiave Previsionale**: serenit\xE0 ritrovata, prospettive favorevoli, successo creativo, protezione, conferma del cammino.

### 18. La Luna (XVIII) \u2013 Inconscio, Illusioni e Percorso Notturno

- **Simbologia ed Essenza**: Luna piena, gambero dalle acque, lupi e torri lontane.
- **Significato Profondo**: regno dell'inconscio, sogni, paure ancestrali, intuito viscerale, illusioni e nebbie da attraversare con la luce interiore.
- **In Chiave Previsionale**: incertezza, segreti, malintesi; procedere ascoltando l'istinto senza paralisi ansiosa.

### 19. Il Sole (XIX) \u2013 Chiarezza, Gioia e Realizzazione Visibile

- **Simbologia ed Essenza**: Sole radioso; bambini festosi in un prato fiorito.
- **Significato Profondo**: verit\xE0 svelata, gioia, trasparenza, calore umano, successo pubblico, vitalit\xE0 cosciente.
- **In Chiave Previsionale**: successo, chiarezza nei rapporti, accordi fortunati, vitalit\xE0, trionfo di un progetto portato alla luce.

### 20. Il Giudizio (XX) \u2013 Chiamata, Risveglio e Rinnovamento

- **Simbologia ed Essenza**: angelo con tromba; figure che emergono dai sepolcri, braccia aperte.
- **Significato Profondo**: chiamata alla consapevolezza, risveglio, perdono, liberazione dai giudizi limitanti.
- **In Chiave Previsionale**: svolta decisiva, notizie importanti, riconciliazione che rinnova l'esistenza.

### 21. Il Mondo (XXI) \u2013 Compiutezza e Cerchio Perfetto

- **Simbologia ed Essenza**: figura danzante nella mandorla di foglie, circondata dai quattro viventi (Toro, Leone, Aquila, Angelo).
- **Significato Profondo**: Compimento dell'Opera, integrazione dei settenari, realizzazione e armonia universale.
- **In Chiave Previsionale**: successo totale, chiusura trionfante di un ciclo, viaggi internazionali, massima espansione.

### Sintesi Didattica del Modulo 3

1. Diavolo (XV) e Torre (XVI) spezzano i vincoli materiali.
2. Dalle Stelle (XVII) e dalla Luna (XVIII) si giunge al Sole (XIX).
3. La chiamata al risveglio del Giudizio (XX) conduce alla compiutezza e al trionfo finale del Mondo (XXI).
`
      },
      {
        moduleNumber: "04",
        title: "Laboratorio Pratico Finale e Verifica",
        subtitle: "Autovalutazione dei cicli \xB7 Stese integrative \xB7 Chiusura Primo Step",
        format: "Quaderno esercizi + Verifica competenze",
        readingMinutes: 25,
        keyTakeaways: [
          "Riconoscere quale settenario risuona nella situazione attuale.",
          "Esercizi tris dei settenari e stesa delle tre fasi.",
          "Chiusura del Primo Step con ripasso al Sigillo flashcard."
        ],
        contentMarkdown: `## Laboratorio Pratico Finale e Verifica delle Competenze

Questa sezione trasforma l'inquadramento teorico dei Tre Settenari in **competenza attiva**, per verificare il livello di assimilazione e usare le carte nella consultazione pratica.

## Test di Autovalutazione dei Cicli

Rispondi ai quesiti guida per capire quale settenario risuona con maggiore frequenza nella tua situazione (o in quella del consultante).

### 1. Fase di Avvio \u2014 Primo Settenario (0 \u2013 VII)

Si sta vivendo un nuovo inizio, cercando la propria direzione o posando le basi di un progetto pratico? In tal caso, analizza l'energia del Matto, del Bagatto e del Carro.

### 2. Fase di Scelta ed Elaborazione \u2014 Secondo Settenario (VIII \u2013 XIV)

Si stanno affrontando blocchi, soste forzate, norme da rispettare o trasformazioni radicali? In tal caso, approfondisci la lezione dell'Eremita, dell'Appeso o della Morte.

### 3. Fase di Svolta e Realizzazione \u2014 Terzo Settenario (XV \u2013 XXI)

Si stanno recidendo schemi limitanti, affrontando lati d'Ombra o raccogliendo i frutti di un percorso completo? In tal caso, osserva l'impatto della Torre, del Sole o del Mondo.

## Esercizi Pratici di Lettura

### Esercizio A \u2014 Il tris dei settenari

Estrai una carta a caso dal mazzo. Riconosci a quale dei tre settenari appartiene e articola a voce alta la lezione evolutiva che esprime per la situazione esaminata.

### Esercizio B \u2014 La stesa delle tre fasi

Esegui una stesa a tre carte, una per ciascun settenario:

1. **Prima carta (1\xB0 Settenario)** \u2014 punto di partenza e azione pratica immediata.
2. **Seconda carta (2\xB0 Settenario)** \u2014 nodo interiore o prova etica da superare.
3. **Terza carta (3\xB0 Settenario)** \u2014 prospettiva di sblocco e direzione evolutiva finale.

## Chiusura del Primo Step

Dopo autovalutazione ed esercizi, ripassa i Trionfi 0\u2013XXI con il **Sigillo di apprendimento** (flashcard) e segna i moduli completati nella tua Area Riservata.
`
      }
    ];
  }
});

// src/db/seedData.ts
var COURSE_SEED_CATALOG;
var init_seedData = __esm({
  "src/db/seedData.ts"() {
    init_arcaniMaggioriDispense();
    COURSE_SEED_CATALOG = [
      {
        slug: "arcani-maggiori",
        title: "Arcani Maggiori",
        subtitle: "Primo Step \xB7 Tre Settenari da 0 a XXI \xB7 Presente e Previsione",
        description: "Dispensa formativa completa del Primo Step: mappa dei Tre Settenari, studio dei 22 Trionfi dal Matto al Mondo, visioni multiple, schede visive, Sigillo flashcard ed esercizi di verifica.",
        priceEur: 190,
        stripePriceId: process.env.STRIPE_PRICE_ID_CORSO_ARCANI_MAGGIORI || "STRIPE_PRICE_ID_CORSO_ARCANI_MAGGIORI",
        lessonsCount: 4,
        totalHours: "dispense + Sigillo",
        levelLabel: "Livello Base e Intermedio",
        sortOrder: 1,
        dispense: ARCANI_MAGGIORI_DISPENSE
      },
      {
        slug: "arcani-minori",
        title: "Arcani Minori",
        subtitle: "I Quattro Semi, Numerologia 1\u201310 e Carte di Corte",
        description: "Dall\u2019intuizione alla precisione quotidiana: padroneggia i 56 Arcani Minori per leggere tempi, persone coinvolte, dinamiche lavorative, sentimentali e materiali.",
        priceEur: 210,
        stripePriceId: process.env.STRIPE_PRICE_ID_CORSO_ARCANI_MINORI || "STRIPE_PRICE_ID_CORSO_ARCANI_MINORI",
        lessonsCount: 14,
        totalHours: "9h 45m video",
        levelLabel: "Livello Intermedio",
        sortOrder: 2,
        dispense: [
          {
            moduleNumber: "01",
            title: "Atlante dei Quattro Semi ed Elementi",
            subtitle: "Bastoni, Coppe, Spade e Denari nella vita concreta",
            format: "Atlante PDF + Schede Elementali",
            readingMinutes: 20,
            keyTakeaways: [
              "Riconoscere a colpo d\u2019occhio la prevalenza di un seme nella stesa.",
              "Corrispondenza tra Elemento, stagione previsionale e velocit\xE0 degli eventi.",
              "Compensare un seme assente per leggere ci\xF2 che manca nella situazione."
            ],
            contentMarkdown: `## I Quattro Semi: La Trama del Quotidiano

Se gli Arcani Maggiori segnano i grandi capitoli del destino, i 56 Arcani Minori mostrano come gli eventi prendono forma giorno per giorno.

### Quadro Elementale
- **Bastoni (Fuoco \xB7 Primavera)**: iniziativa, impresa, passione, spostamenti e ritmo rapido.
- **Coppe (Acqua \xB7 Estate)**: legami affettivi, ascolto, famiglia, sensibilit\xE0 e fiducia.
- **Spade (Aria \xB7 Autunno)**: pensiero strategico, decisioni nette, confini, documenti e chiarezza verbale.
- **Denari (Terra \xB7 Inverno)**: lavoro stabile, entrate economiche, casa, salute quotidiana e maturazione lenta.`
          },
          {
            moduleNumber: "02",
            title: "Numerologia dall\u2019Asso al Dieci per Seme",
            subtitle: "Leggere i gradi di sviluppo di ogni progetto o legame",
            format: "Dispensa Numerologica PDF",
            readingMinutes: 26,
            keyTakeaways: [
              "Assi e Due: nascita dell\u2019impulso e prima scelta relazionale o operativa.",
              "Cinque e Sette: snodi di verifica, attrito costruttivo e perseveranza.",
              "Nove e Dieci: raccolta autonoma e compimento di un intero ciclo."
            ],
            contentMarkdown: `## La Scala Numerica nei Tarocchi Minori

Comprendere la logica dei numeri da 1 a 10 evita di dover memorizzare meccanicamente 40 significati isolati.

### Le Fasi del Ciclo 1\u201310
- **1 (Asso)**: seme puro, occasione nuova nel dominio del seme.
- **2 \u2013 3**: dualit\xE0/accordo (2) e prima espansione visibile (3).
- **4**: consolidamento, pausa protettiva o struttura stabile.
- **5**: sfida dinamica, confronto o perdita di un vecchio equilibrio necessario a crescere.
- **6**: armonia ritrovata, scambio equo, passaggio di transizione.
- **7 \u2013 8**: prova di discernimento (7) e accelerazione/maestria (8).
- **9 \u2013 10**: culmine individuale (9) e saturazione/nuovo inizio del ciclo (10).`
          },
          {
            moduleNumber: "03",
            title: "Le 16 Figure di Corte: Ritratti e Ruoli",
            subtitle: "Fanti, Cavalieri, Regine e Re nella lettura reale",
            format: "Schede Personaggi PDF",
            readingMinutes: 24,
            keyTakeaways: [
              "Distinguere quando una Figura indica una persona esterna o una qualit\xE0 interiore.",
              "I Fanti come messaggi imminenti, studi o notizie in arrivo.",
              "Cavalieri (movimento), Regine (cura e padronanza interna) e Re (autorit\xE0)."
            ],
            contentMarkdown: `## Decifrare le Figure di Corte Senza Ambiguit\xE0

Le Carte di Corte rappresentano spesso il punto pi\xF9 temuto da chi inizia: in questa dispensa le trasformiamo in alleate chiarissime.

### I Quattro Ranghi
1. **Fanti**: principianti curiosi, messaggi scritti, convocazioni o proposte fresche.
2. **Cavalieri**: movimento in atto, arrivi, cambi rapidi di stato (Spade/Bastoni velocissimi; Coppe romantico; Denari costante).
3. **Regine**: governo ricettivo, intelligenza emotiva o pratica gi\xE0 maturata.
4. **Re**: decisione responsabile, guida professionale, consolidamento di posizione.`
          },
          {
            moduleNumber: "04",
            title: "Integrazione Maggiori + Minori e Tempistiche",
            subtitle: "Calibrare settimane, mesi e azioni concrete nelle previsioni",
            format: "Protocollo Previsionale PDF",
            readingMinutes: 22,
            keyTakeaways: [
              "Usare gli Arcani Minori come lente di dettaglio attorno a un Arcano Maggiore.",
              "Indicatori di tempo rapido (Bastoni/Spade) vs maturazione graduale (Coppe/Denari).",
              "Sintesi di stese miste su temi lavorativi e relazionali."
            ],
            contentMarkdown: `## La Lettura Integrata a 78 Carte

Un Arcano Maggiore indica *che cosa* sta maturando a livello profondo; l'Arcano Minore adiacente specifica *come* e *in quali tempi* si manifesta.

### Esempio di Lettura Combinata
- **Il Sole + Asso di Denari**: opportunit\xE0 concreta di contratto, nuova entrata economica o avvio solido entro poche settimane.
- **La Giustizia + Tre di Spade**: chiarezza necessaria dopo una parola non detta; l'equilibrio torna scegliendo trasparenza.`
          }
        ]
      },
      {
        slug: "metodi-stesura",
        title: "Metodi di Stesura",
        subtitle: "Architetture di Lettura, Sintesi ed Etica del Consulto",
        description: "Dalla domanda alla narrazione coerente: impara a scegliere la geometria di stesa pi\xF9 adatta, collegare le carte tra loro e condurre un consulto professionale.",
        priceEur: 240,
        stripePriceId: process.env.STRIPE_PRICE_ID_CORSO_METODI_STESURA || "STRIPE_PRICE_ID_CORSO_METODI_STESURA",
        lessonsCount: 10,
        totalHours: "7h 30m video",
        levelLabel: "Livello Avanzato & Pratica",
        sortOrder: 3,
        dispense: [
          {
            moduleNumber: "01",
            title: "L\u2019Arte della Domanda e Patto Deontologico",
            subtitle: "Trasformare quesiti chiusi in domande generative e verificabili",
            format: "Guida Operativa PDF",
            readingMinutes: 18,
            keyTakeaways: [
              "Perch\xE9 evitare domande binarie rigide (\u201Cs\xEC/no\u201D) che spengono il dialogo.",
              "Struttura del patto iniziale con il consultante secondo la Legge 4/2013.",
              "Rituale sobrio di centratura prima di estrarre le carte."
            ],
            contentMarkdown: `## Prima delle Carte: Formulare la Domanda Giusta

La precisione di una stesa nasce prima ancora di mescolare il mazzo: una domanda confusa produce risposte confuse.

### Riformulazione Pratica
- **Invece di**: "Andr\xE0 bene il progetto?"
- **Formula**: "Quali risorse sostengono questo progetto oggi e quale direzione evolutiva mostrano i prossimi tre mesi?"

### Apertura del Consulto
Spiegare in modo sobrio che la lettura illumina il presente e traccia le tendenze future rispettando sempre la libert\xE0 di azione della persona crea immediatamente fiducia e serenit\xE0.`
          },
          {
            moduleNumber: "02",
            title: "Stese Essenziali (3 e 5 Carte) e Linea Temporale",
            subtitle: "Schemi rapidi ad alta leggibilit\xE0 per consulti da 45 minuti",
            format: "Quaderno Schemi PDF",
            readingMinutes: 20,
            keyTakeaways: [
              "Stesa a 3 carte: Radice \xB7 Nodo Attuale \xB7 Tendenza Futura.",
              "Stesa del Bivio a 5 carte per confrontare due scelte lavorative o affettive.",
              "Evitare la sovrapposizione di carte extra non necessarie."
            ],
            contentMarkdown: `## Geometrie Essenziali ad Alta Chiarezza

Non serve estrarre dieci carte quando una domanda chiede decisione immediata.

### 1. Stesa a 3 Carte (Presente \u2192 Futuro)
1. Stato attuale e radice emotiva/pratica.
2. Ostacolo o leva decisiva del momento.
3. Direzione previsionale pi\xF9 probabile e consiglio operativo.

### 2. Stesa del Bivio (5 Carte)
Carta 1 al centro (il consultante), poi due rami paralleli (2-3 per l'Opzione A, 4-5 per l'Opzione B) per confrontare serenamente fatiche e frutti di ciascuna scelta.`
          },
          {
            moduleNumber: "03",
            title: "La Croce Celtica a 10 Carte nel Metodo Tarot Italia",
            subtitle: "Lettura stratificata di contesto, influenze e sviluppo futuro",
            format: "Mappa Posizioni PDF + Caso Reale",
            readingMinutes: 30,
            keyTakeaways: [
              "Significato esatto delle 6 posizioni della Croce centrale e delle 4 del Bastone.",
              "Come leggere la Carta 2 (l\u2019attraversamento) non solo come blocco ma come stimolo.",
              "Collegare la Posizione 6 (futuro prossimo) alla Posizione 10 (esito di ciclo)."
            ],
            contentMarkdown: `## La Croce Celtica: Architettura Classica

La Croce Celtica rimane lo strumento pi\xF9 completo per sviscerare una questione articolata in un consulto da 60 minuti.

### La Croce (Posizioni 1\u20136)
1. Il cuore del presente.
2. Ci\xF2 che attraversa o sfida la situazione.
3. L'obiettivo consapevole.
4. La radice profonda / memoria inconscia.
5. Il passato recente che si sta chiudendo.
6. Il futuro prossimo in avvicinamento.

### Il Bastone Verticale (Posizioni 7\u201310)
7. Atteggiamento del consultante \xB7 8. Ambiente e persone attorno \xB7 9. Timori o attese \xB7 10. Sintesi evolutiva finale.`
          },
          {
            moduleNumber: "04",
            title: "La Ruota delle 12 Case e Sintesi Scritta Finale",
            subtitle: "Mappatura annuale completa e restituzione professionale",
            format: "Template Sintesi + Ruota 12 Case",
            readingMinutes: 25,
            keyTakeaways: [
              "Distribuire le 12 aree di vita (identit\xE0, risorse, casa, amore, lavoro, visione).",
              "Individuare le carte ponte che collegano ambiti distanti.",
              "Redigere la sintesi scritta post-consulto chiara, empatica e senza tecnicismi inutili."
            ],
            contentMarkdown: `## La Ruota Annuale e l'Arte della Restituzione

Nella sessione integrata da 90 minuti la Ruota delle 12 Case offre una bussola completa per i dodici mesi successivi.

### Struttura della Sintesi Finale
1. **Filo Rosso**: il tema centrale emerso trasversalmente tra le carte.
2. **Punti di Forza**: le risorse gi\xE0 attive su cui appoggiarsi subito.
3. **Snodi Previsionali**: i mesi o passaggi chiave che richiedono attenzione o slancio.
4. **Tre Domande Maieutiche**: spunti concreti che il consultante porta con s\xE9 dopo l'incontro.`
          }
        ]
      }
    ];
  }
});

// src/db/courseCatalog.ts
async function ensureCatalogSeeded() {
  if (!seedPromise) {
    seedPromise = (async () => {
      try {
        for (const item of COURSE_SEED_CATALOG) {
          const inserted = await db.insert(courses).values({
            slug: item.slug,
            title: item.title,
            subtitle: item.subtitle,
            description: item.description,
            priceEur: item.priceEur,
            stripePriceId: item.stripePriceId,
            lessonsCount: item.lessonsCount,
            totalHours: item.totalHours,
            levelLabel: item.levelLabel,
            sortOrder: item.sortOrder,
            isPublished: true
          }).onConflictDoUpdate({
            target: courses.slug,
            set: {
              title: item.title,
              subtitle: item.subtitle,
              description: item.description,
              priceEur: item.priceEur,
              stripePriceId: item.stripePriceId,
              lessonsCount: item.lessonsCount,
              totalHours: item.totalHours,
              levelLabel: item.levelLabel,
              sortOrder: item.sortOrder
            }
          }).returning();
          const courseRow = inserted[0];
          if (!courseRow) continue;
          for (let i = 0; i < item.dispense.length; i++) {
            const d = item.dispense[i];
            await db.insert(dispense).values({
              courseId: courseRow.id,
              moduleNumber: d.moduleNumber,
              title: d.title,
              subtitle: d.subtitle,
              format: d.format,
              readingMinutes: d.readingMinutes,
              contentMarkdown: d.contentMarkdown,
              keyTakeaways: JSON.stringify(d.keyTakeaways),
              sortOrder: i + 1
            }).onConflictDoUpdate({
              target: [dispense.courseId, dispense.moduleNumber],
              set: {
                title: d.title,
                subtitle: d.subtitle,
                format: d.format,
                readingMinutes: d.readingMinutes,
                contentMarkdown: d.contentMarkdown,
                keyTakeaways: JSON.stringify(d.keyTakeaways),
                sortOrder: i + 1
              }
            });
          }
        }
      } catch (error) {
        seedPromise = null;
        if (isDbConnectionFailure(error)) {
          resetDbPool();
        }
        console.error("Catalog seeding failed:", error);
        throw new Error("Impossibile inizializzare il catalogo corsi e dispense.", {
          cause: error
        });
      }
    })();
  }
  return seedPromise;
}
async function getPublicCourseCatalog() {
  await ensureCatalogSeeded();
  try {
    const courseRows = await db.select().from(courses).where(eq(courses.isPublished, true)).orderBy(asc(courses.sortOrder));
    const dispensaRows = await db.select({
      id: dispense.id,
      courseId: dispense.courseId,
      moduleNumber: dispense.moduleNumber,
      title: dispense.title,
      subtitle: dispense.subtitle,
      format: dispense.format,
      readingMinutes: dispense.readingMinutes,
      sortOrder: dispense.sortOrder
    }).from(dispense).orderBy(asc(dispense.sortOrder));
    return courseRows.map((course) => ({
      ...course,
      dispenseOutline: dispensaRows.filter((d) => d.courseId === course.id)
    }));
  } catch (error) {
    console.error("Failed to load public courses:", error);
    throw new Error("Impossibile caricare il catalogo dei percorsi formativi.", {
      cause: error
    });
  }
}
var seedPromise;
var init_courseCatalog = __esm({
  "src/db/courseCatalog.ts"() {
    init_drizzle_orm();
    init_db2();
    init_schema2();
    init_seedData();
    seedPromise = null;
  }
});

// src/lib/paymentCatalog.ts
function resolveBookingTariff(tariffId) {
  if (tariffId !== "20m" && tariffId !== "45m" && tariffId !== "60m" && tariffId !== "90m") {
    return null;
  }
  return BOOKING_TARIFF_CATALOG[tariffId];
}
var BOOKING_TARIFF_CATALOG;
var init_paymentCatalog = __esm({
  "src/lib/paymentCatalog.ts"() {
    BOOKING_TARIFF_CATALOG = {
      "20m": {
        id: "20m",
        title: "Consulto Breve",
        durationMinutes: 20,
        priceEur: 19,
        stripePriceIdAnnotation: "STRIPE_PRICE_ID_CONSULTO_20M",
        onlineOnly: true
      },
      "45m": {
        id: "45m",
        title: "Consulto Essenziale",
        durationMinutes: 45,
        priceEur: 50,
        stripePriceIdAnnotation: "STRIPE_PRICE_ID_CONSULTO_45M"
      },
      "60m": {
        id: "60m",
        title: "Consulto Evolutivo Completo",
        durationMinutes: 60,
        priceEur: 75,
        stripePriceIdAnnotation: "STRIPE_PRICE_ID_CONSULTO_60M"
      },
      "90m": {
        id: "90m",
        title: "Sessione Integrata",
        durationMinutes: 90,
        priceEur: 90,
        stripePriceIdAnnotation: "STRIPE_PRICE_ID_CONSULTO_90M"
      }
    };
  }
});

// src/lib/bookingRules.ts
function isEveningSlot(slot) {
  const hour = Number(String(slot).slice(0, 2));
  return Number.isFinite(hour) && hour >= EVENING_SLOT_HOUR;
}
function resolveBookingMode(mode, slot) {
  if (isEveningSlot(slot)) return "remote";
  return mode === "studio" ? "studio" : "remote";
}
function sessionModeLabel(mode, slot) {
  const resolved = slot != null ? resolveBookingMode(mode, slot) : mode === "studio" ? "studio" : "remote";
  const base = resolved === "remote" ? "Online \xB7 chiamata vocale" : "Di persona a Macerata";
  if (slot != null && isEveningSlot(slot) && mode === "studio") {
    return `${base} \xB7 dalle 19:00 solo online`;
  }
  return base;
}
var EVENING_SLOT_HOUR;
var init_bookingRules = __esm({
  "src/lib/bookingRules.ts"() {
    EVENING_SLOT_HOUR = 19;
  }
});

// src/lib/bookingSlots.ts
function occupiedKey(dateIso, slot) {
  return `${dateIso}|${slot}`;
}
var BOOKING_TIMEZONE, BOOKING_HOUR_START, BOOKING_HOUR_END, HOUR_SLOTS;
var init_bookingSlots = __esm({
  "src/lib/bookingSlots.ts"() {
    BOOKING_TIMEZONE = "Europe/Rome";
    BOOKING_HOUR_START = 9;
    BOOKING_HOUR_END = 20;
    HOUR_SLOTS = Array.from(
      { length: BOOKING_HOUR_END - BOOKING_HOUR_START + 1 },
      (_, i) => `${String(i + BOOKING_HOUR_START).padStart(2, "0")}:00`
    );
  }
});

// src/lib/bookingConfirmTemplates.ts
function fillBookingConfirmHtml(vars) {
  return fillTemplate(BOOKING_CONFIRM_HTML, vars);
}
function fillBookingConfirmText(vars) {
  return fillTemplate(BOOKING_CONFIRM_TEXT, vars);
}
function fillTemplate(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = vars[key];
    return value == null ? "" : String(value);
  });
}
function formatBookingDateIt(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobre",
    "novembre",
    "dicembre"
  ];
  if (!year || !month || !day || month < 1 || month > 12) return iso;
  return `${day} ${months[month - 1]} ${year}`;
}
function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
var BOOKING_CONFIRM_TEXT, BOOKING_CONFIRM_HTML;
var init_bookingConfirmTemplates = __esm({
  "src/lib/bookingConfirmTemplates.ts"() {
    BOOKING_CONFIRM_TEXT = `Pagamento ricevuto \u2014 Tarot Italia

{{user_name}}, sono Teresa. Il pagamento \xE8 andato a buon fine. La sessione \xE8 riservata sul tuo spazio.

Consulto: {{session_title}}
Quando: {{booking_date}} \xB7 {{booking_time}}
Modalit\xE0: {{session_mode}}
Importo: \u20AC{{amount}}
Riferimento: {{booking_id}}
Transazione: {{transaction_id}}

Area riservata: {{riservata_url}}
Recesso e assistenza: {{whatsapp_url}}

A presto,
Teresa
Maria Teresa Rogani \xB7 Tarot Italia

{{support_email}} \u2014 ti rispondo personalmente
https://www.tarotitalia.com
`;
    BOOKING_CONFIRM_HTML = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Pagamento ricevuto \u2014 Tarot Italia</title>
</head>
<body style="margin:0;padding:0;background-color:#F9F8F6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F9F8F6;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;width:100%;">
          <tr>
            <td align="center" style="padding:0 0 28px 0;">
              <p style="margin:0;font-family:Georgia,serif;font-size:18px;letter-spacing:0.14em;text-transform:uppercase;color:#2B2523;">Tarot Italia</p>
              <p style="margin:10px 0 0 0;font-family:Arial,sans-serif;font-size:13px;color:#7A8B78;">di Maria Teresa Rogani, operatore olistico</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 8px 0;font-family:Arial,sans-serif;font-size:16px;line-height:1.65;color:#2B2523;">
              <p style="margin:0 0 18px 0;font-family:Georgia,serif;font-size:22px;">Pagamento ricevuto</p>
              <p style="margin:0 0 16px 0;">{{user_name}}, sono Teresa. Il pagamento \xE8 andato a buon fine. La sessione \xE8 riservata sul tuo spazio.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 28px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#F1F0EC;border:1px solid #7A8B78;">
                <tr>
                  <td style="padding:22px 20px;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#2B2523;">
                    <p style="margin:0 0 14px 0;font-family:Georgia,serif;font-size:15px;">Dettagli della sessione</p>
                    <p style="margin:0 0 6px 0;"><span style="color:#7A8B78;">Consulto</span><br />{{session_title}}</p>
                    <p style="margin:0 0 6px 0;"><span style="color:#7A8B78;">Quando</span><br />{{booking_date}} \xB7 {{booking_time}}</p>
                    <p style="margin:0 0 6px 0;"><span style="color:#7A8B78;">Modalit\xE0</span><br />{{session_mode}}</p>
                    <p style="margin:0 0 6px 0;"><span style="color:#7A8B78;">Importo</span><br />\u20AC{{amount}}</p>
                    <p style="margin:0 0 6px 0;"><span style="color:#7A8B78;">Riferimento</span><br />{{booking_id}}</p>
                    <p style="margin:0;"><span style="color:#7A8B78;">Transazione</span><br />{{transaction_id}}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 0 28px 0;">
              <a href="{{riservata_url}}" style="display:inline-block;padding:14px 28px;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;color:#F9F8F6;background-color:#2B2523;">Area Riservata</a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 36px 0;font-family:Georgia,serif;font-size:16px;color:#2B2523;">
              <p style="margin:0 0 6px 0;font-style:italic;">A presto,</p>
              <p style="margin:0;">Teresa</p>
              <p style="margin:6px 0 0 0;font-family:Arial,sans-serif;font-size:13px;color:#7A8B78;">Maria Teresa Rogani \xB7 Tarot Italia</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="font-family:Arial,sans-serif;font-size:12px;color:#7A8B78;">
              <a href="{{whatsapp_url}}" style="color:#7A8B78;">Recesso e assistenza</a>
              \xB7 <a href="mailto:{{support_email}}" style="color:#7A8B78;">{{support_email}}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }
});

// src/lib/googleCalendar.ts
import { createSign } from "crypto";
function isGoogleCalendarConfigured() {
  const refresh = process.env.GOOGLE_OAUTH_REFRESH_TOKEN?.trim() || process.env.GOOGLE_CALENDAR_REFRESH_TOKEN?.trim();
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim();
  if (refresh && clientId && clientSecret) return true;
  const email = process.env.GOOGLE_CLIENT_EMAIL?.trim();
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();
  return Boolean(email && key);
}
function calendarId() {
  return process.env.GOOGLE_CALENDAR_ID?.trim() || process.env.GOOGLE_CALENDAR_EMAIL?.trim() || "primary";
}
async function googleAccessToken() {
  const refresh = process.env.GOOGLE_OAUTH_REFRESH_TOKEN?.trim() || process.env.GOOGLE_CALENDAR_REFRESH_TOKEN?.trim();
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID?.trim();
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET?.trim();
  if (refresh && clientId && clientSecret) {
    const res2 = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh,
        client_id: clientId,
        client_secret: clientSecret
      })
    });
    const data2 = await res2.json();
    if (!res2.ok || !data2.access_token) {
      console.error("Google OAuth token", res2.status, data2);
      return null;
    }
    return data2.access_token;
  }
  const email = process.env.GOOGLE_CLIENT_EMAIL?.trim();
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();
  if (!email || !key) return null;
  const now = Math.floor(Date.now() / 1e3);
  const header = Buffer.from(
    JSON.stringify({ alg: "RS256", typ: "JWT" })
  ).toString("base64url");
  const claim = Buffer.from(
    JSON.stringify({
      iss: email,
      scope: CALENDAR_SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600
    })
  ).toString("base64url");
  const unsigned = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = signer.sign(key).toString("base64url");
  const assertion = `${unsigned}.${signature}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) {
    console.error("Google service account token", res.status, data);
    return null;
  }
  return data.access_token;
}
function addMinutes(day, slot, minutes) {
  const [hour, minute] = slot.split(":").map(Number);
  const total = hour * 60 + minute + minutes;
  const pad = (n) => String(n).padStart(2, "0");
  const daysAhead = Math.floor(total / (24 * 60));
  const mins = (total % (24 * 60) + 24 * 60) % (24 * 60);
  const endH = Math.floor(mins / 60);
  const endM = mins % 60;
  if (!daysAhead) return `${day}T${pad(endH)}:${pad(endM)}:00`;
  const [year, month, date2] = day.split("-").map(Number);
  const next = new Date(year, month - 1, date2 + daysAhead);
  return `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}T${pad(endH)}:${pad(endM)}:00`;
}
async function createGoogleCalendarEvent(booking) {
  const token = await googleAccessToken();
  if (!token) {
    console.error(
      "Google Calendar skipped \u2014 missing OAuth or service account secrets"
    );
    return null;
  }
  const start = `${booking.day}T${booking.slot}:00`;
  const end = addMinutes(booking.day, booking.slot, booking.minutes);
  const body = {
    summary: `Tarot Italia \xB7 ${booking.title} \xB7 ${booking.guestName}`,
    description: [
      booking.title,
      `Quando: ${booking.day} \xB7 ${booking.slot}`,
      `Modalit\xE0: ${booking.modeLabel}`,
      `Recapito: ${booking.phone}`,
      booking.customerEmail ? `Email: ${booking.customerEmail}` : "",
      `Riferimento: ${booking.id}`
    ].filter(Boolean).join("\n"),
    start: { dateTime: start, timeZone: BOOKING_TIMEZONE },
    end: { dateTime: end, timeZone: BOOKING_TIMEZONE },
    transparency: "opaque",
    status: "confirmed",
    reminders: { useDefault: true }
  };
  const id = calendarId();
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events?sendUpdates=none`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  );
  if (!res.ok) {
    console.error("Google Calendar insert", res.status, await res.text());
    return null;
  }
  const data = await res.json();
  return data.id ?? null;
}
async function fetchGoogleBusySlotKeys(fromIso, toIso) {
  if (!isGoogleCalendarConfigured()) return [];
  const token = await googleAccessToken();
  if (!token) return [];
  const timeMin = `${fromIso}T00:00:00+01:00`;
  const timeMax = `${toIso}T23:59:59+01:00`;
  const id = calendarId();
  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      timeMin,
      timeMax,
      timeZone: BOOKING_TIMEZONE,
      items: [{ id }]
    })
  });
  if (!res.ok) {
    console.error("Google FreeBusy", res.status, await res.text());
    return [];
  }
  const data = await res.json();
  const busy = data.calendars?.[id]?.busy ?? [];
  const keys = /* @__PURE__ */ new Set();
  for (const block of busy) {
    const start = new Date(block.start);
    const end = new Date(block.end);
    for (let cursor = new Date(start); cursor < end; cursor.setMinutes(cursor.getMinutes() + 30)) {
      const day = localIsoFromDateInRome(cursor);
      const hour = Number(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: BOOKING_TIMEZONE,
          hour: "2-digit",
          hour12: false
        }).format(cursor)
      );
      if (hour >= 9 && hour <= 20) {
        keys.add(`${day}|${String(hour).padStart(2, "0")}:00`);
      }
    }
  }
  return [...keys];
}
function localIsoFromDateInRome(date2) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BOOKING_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date2);
  const y = parts.find((p) => p.type === "year")?.value;
  const m = parts.find((p) => p.type === "month")?.value;
  const d = parts.find((p) => p.type === "day")?.value;
  return `${y}-${m}-${d}`;
}
var CALENDAR_SCOPE;
var init_googleCalendar = __esm({
  "src/lib/googleCalendar.ts"() {
    init_bookingSlots();
    CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";
  }
});

// src/lib/zohoMail.ts
import nodemailer from "nodemailer";
function zohoConfigured() {
  const user = process.env.ZOHO_EMAIL?.trim();
  const pass = process.env.ZOHO_PASSWORD;
  if (!user || !pass) return null;
  const host = process.env.ZOHO_SMTP_HOST?.trim() || "smtp.zoho.eu";
  const port = Number(process.env.ZOHO_SMTP_PORT || "465");
  return { user, pass, host, port: Number.isFinite(port) ? port : 465 };
}
function isZohoMailConfigured() {
  return Boolean(zohoConfigured());
}
async function sendZohoMails(messages) {
  const cfg = zohoConfigured();
  if (!cfg) {
    throw new Error("ZOHO_NOT_CONFIGURED");
  }
  const fromAddress = process.env.ZOHO_FROM_EMAIL?.trim() || cfg.user;
  const fromName = process.env.ZOHO_FROM_NAME?.trim() || "Maria Teresa Rogani \xB7 Tarot Italia";
  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465,
    auth: { user: cfg.user, pass: cfg.pass },
    connectionTimeout: 2e4,
    greetingTimeout: 2e4,
    socketTimeout: 3e4
  });
  try {
    for (const message of messages) {
      await transporter.sendMail({
        from: `"${fromName}" <${fromAddress}>`,
        replyTo: message.replyTo || fromAddress,
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html
      });
    }
  } finally {
    transporter.close();
  }
}
var init_zohoMail = __esm({
  "src/lib/zohoMail.ts"() {
  }
});

// src/lib/bookingFulfillment.ts
async function fulfillConfirmedBooking(row, extras) {
  const mode = resolveBookingMode(
    String(row.mode || "remote"),
    row.scheduledTime
  );
  const modeLabel = sessionModeLabel(mode, row.scheduledTime);
  const tariff = row.tariffId in BOOKING_TARIFF_CATALOG ? BOOKING_TARIFF_CATALOG[row.tariffId] : null;
  const title = tariff?.title || `Consulto ${row.durationMinutes} minuti`;
  try {
    await sendBookingMails(row, {
      ...extras,
      title,
      modeLabel
    });
  } catch (error) {
    console.error("booking mail", error);
  }
  let calendarEventId = null;
  try {
    calendarEventId = await createGoogleCalendarEvent({
      id: row.id,
      title,
      day: row.scheduledDate,
      slot: row.scheduledTime,
      minutes: row.durationMinutes,
      modeLabel,
      guestName: row.fullName,
      phone: row.phoneWhatsapp,
      customerEmail: extras.customerEmail || row.email
    });
  } catch (error) {
    console.error("booking calendar", error);
  }
  return { calendarEventId };
}
async function sendBookingMails(row, extras) {
  if (!isZohoMailConfigured()) {
    console.error("Missing ZOHO secrets \u2014 booking mail skipped");
    return;
  }
  const site = (process.env.APP_URL?.trim() || process.env.SITE_URL?.trim() || "https://www.tarotitalia.com").replace(/\/$/, "");
  const supportEmail = process.env.ZOHO_FROM_EMAIL?.trim() || process.env.ZOHO_EMAIL?.trim() || "info@tarotitalia.com";
  const studioTo = process.env.ZOHO_STUDIO_EMAIL?.trim() || supportEmail;
  const whatsappUrl = process.env.WHATSAPP_ASSIST_URL?.trim() || "https://wa.me/393791038253";
  const euros = extras.amountCents != null && extras.amountCents >= 0 ? extras.amountCents / 100 : row.priceEur;
  const amount = Number.isFinite(euros) ? euros.toLocaleString("it-IT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }) : String(row.priceEur);
  const vars = {
    user_name: row.fullName.trim() || "Gentile",
    user_email: extras.customerEmail || row.email,
    session_title: extras.title,
    session_mode: extras.modeLabel,
    booking_date: formatBookingDateIt(row.scheduledDate),
    booking_time: row.scheduledTime,
    booking_id: String(row.id),
    transaction_id: extras.transactionId || "\u2014",
    amount,
    phone: row.phoneWhatsapp,
    riservata_url: `${site}/area-riservata`,
    whatsapp_url: whatsappUrl,
    support_email: supportEmail
  };
  const htmlVars = {
    ...vars,
    user_name: escapeHtml(vars.user_name),
    user_email: escapeHtml(vars.user_email),
    session_title: escapeHtml(vars.session_title),
    session_mode: escapeHtml(vars.session_mode),
    booking_date: escapeHtml(vars.booking_date),
    booking_time: escapeHtml(vars.booking_time),
    booking_id: escapeHtml(vars.booking_id),
    transaction_id: escapeHtml(vars.transaction_id),
    amount: escapeHtml(vars.amount),
    phone: escapeHtml(vars.phone),
    riservata_url: escapeHtml(vars.riservata_url),
    whatsapp_url: escapeHtml(vars.whatsapp_url),
    support_email: escapeHtml(vars.support_email)
  };
  const messages = [];
  if (vars.user_email) {
    messages.push({
      to: vars.user_email,
      subject: `Pagamento ricevuto \u2014 ${vars.booking_date} \xB7 ${vars.booking_time}`,
      text: fillBookingConfirmText(vars),
      html: fillBookingConfirmHtml(htmlVars),
      replyTo: supportEmail
    });
  }
  const studioText = [
    "Nuova prenotazione confermata \u2014 Tarot Italia",
    `Nome: ${vars.user_name}`,
    `Email: ${vars.user_email || "\u2014"}`,
    `Recapito: ${vars.phone}`,
    `Sessione: ${vars.session_title}`,
    `Quando: ${vars.booking_date} \xB7 ${vars.booking_time}`,
    `Modalit\xE0: ${vars.session_mode}`,
    `Totale: \u20AC${amount}`,
    `Riferimento: ${vars.booking_id}`,
    `Transazione: ${vars.transaction_id}`
  ].join("\n");
  messages.push({
    to: studioTo,
    subject: `Nuova prenotazione \u2014 ${vars.user_name} \xB7 ${vars.booking_date} ${vars.booking_time}`,
    text: studioText,
    html: `<div style="font-family:Georgia,serif;color:#2B2523;background:#F9F8F6;padding:28px"><p>${escapeHtml(studioText).replaceAll("\n", "<br>")}</p></div>`,
    replyTo: vars.user_email || supportEmail
  });
  await sendZohoMails(messages);
}
var init_bookingFulfillment = __esm({
  "src/lib/bookingFulfillment.ts"() {
    init_bookingRules();
    init_bookingConfirmTemplates();
    init_googleCalendar();
    init_zohoMail();
    init_paymentCatalog();
  }
});

// src/db/repository.ts
var repository_exports = {};
__export(repository_exports, {
  DIALOGUE_PACK_CATALOG: () => DIALOGUE_PACK_CATALOG,
  FREE_TRIAL_SECONDS: () => FREE_TRIAL_SECONDS,
  attachStripeSessionToBooking: () => attachStripeSessionToBooking,
  cancelPendingBooking: () => cancelPendingBooking,
  confirmConsultationBooking: () => confirmConsultationBooking,
  createConsultationBooking: () => createConsultationBooking,
  createUserNote: () => createUserNote,
  deleteUserNote: () => deleteUserNote,
  enrollUserInCourse: () => enrollUserInCourse,
  ensureCatalogSeeded: () => ensureCatalogSeeded,
  findCourseBySlug: () => findCourseBySlug,
  findCoursePurchaseByStripeSession: () => findCoursePurchaseByStripeSession,
  getBookingById: () => getBookingById,
  getBookingByStripeSessionId: () => getBookingByStripeSessionId,
  getDialogueAccessStatus: () => getDialogueAccessStatus,
  getOrCreateUser: () => getOrCreateUser,
  getPublicCourseCatalog: () => getPublicCourseCatalog,
  getReservedAreaOverview: () => getReservedAreaOverview,
  isSlotTaken: () => isSlotTaken,
  listOccupiedSlots: () => listOccupiedSlots,
  listUserNotes: () => listUserNotes,
  recordDialogueInteraction: () => recordDialogueInteraction,
  unlockDialogueTimePack: () => unlockDialogueTimePack,
  updateDispensaProgress: () => updateDispensaProgress,
  updateUserNote: () => updateUserNote,
  userOwnsCourse: () => userOwnsCourse
});
async function getOrCreateUser(uid, email, displayName) {
  try {
    const result = await db.insert(users).values({
      uid,
      email,
      displayName: displayName ?? null
    }).onConflictDoUpdate({
      target: users.uid,
      set: {
        email,
        ...displayName ? { displayName } : {},
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return result[0];
  } catch (error) {
    if (isDbConnectionFailure(error)) {
      resetDbPool();
      console.error("Failed to upsert user (DB connect timeout/unreachable):", error);
    } else {
      console.error("Failed to upsert user:", error);
    }
    throw new Error("Errore durante la sincronizzazione del profilo utente.", {
      cause: error
    });
  }
}
async function getReservedAreaOverview(uid, email, displayName) {
  await ensureCatalogSeeded();
  try {
    const dbUser = await getOrCreateUser(uid, email, displayName);
    const allCourses = await db.select().from(courses).where(eq(courses.isPublished, true)).orderBy(asc(courses.sortOrder));
    const userPurchases = await db.select().from(coursePurchases).where(
      and(
        eq(coursePurchases.userId, dbUser.id),
        eq(coursePurchases.status, "active")
      )
    );
    const unlockedCourseIds = userPurchases.map((p) => p.courseId);
    const allOutlineDispense = await db.select({
      id: dispense.id,
      courseId: dispense.courseId,
      moduleNumber: dispense.moduleNumber,
      title: dispense.title,
      subtitle: dispense.subtitle,
      format: dispense.format,
      readingMinutes: dispense.readingMinutes,
      sortOrder: dispense.sortOrder
    }).from(dispense).orderBy(asc(dispense.sortOrder));
    const unlockedDispenseRows = unlockedCourseIds.length > 0 ? await db.select().from(dispense).where(inArray(dispense.courseId, unlockedCourseIds)).orderBy(asc(dispense.sortOrder)) : [];
    const progressRows = unlockedDispenseRows.length > 0 ? await db.select().from(dispensaProgress).where(eq(dispensaProgress.userId, dbUser.id)) : [];
    const progressByDispensaId = new Map(
      progressRows.map((row) => [row.dispensaId, row])
    );
    const userBookings = await db.select().from(consultationBookings).where(eq(consultationBookings.userId, dbUser.id)).orderBy(desc(consultationBookings.createdAt));
    const userDialoguePasses = await db.select().from(dialoguePurchases).where(eq(dialoguePurchases.userId, dbUser.id)).orderBy(desc(dialoguePurchases.createdAt));
    return {
      user: {
        id: dbUser.id,
        uid: dbUser.uid,
        email: dbUser.email,
        displayName: dbUser.displayName,
        phoneWhatsapp: dbUser.phoneWhatsapp
      },
      courses: allCourses.map((course) => {
        const purchase = userPurchases.find((p) => p.courseId === course.id);
        const isUnlocked = Boolean(purchase);
        const outline = allOutlineDispense.filter((d) => d.courseId === course.id);
        const fullDispense = unlockedDispenseRows.filter((d) => d.courseId === course.id).map((d) => {
          const prog = progressByDispensaId.get(d.id);
          let parsedTakeaways = [];
          try {
            parsedTakeaways = JSON.parse(d.keyTakeaways);
          } catch {
            parsedTakeaways = [];
          }
          return {
            ...d,
            keyTakeaways: parsedTakeaways,
            completed: prog?.completed ?? false,
            personalNotes: prog?.personalNotes ?? ""
          };
        });
        return {
          ...course,
          isUnlocked,
          purchasedAt: purchase?.purchasedAt ?? null,
          amountPaidEur: purchase?.amountPaidEur ?? null,
          dispenseCount: outline.length,
          dispenseOutline: outline,
          unlockedDispense: fullDispense
        };
      }),
      bookings: userBookings,
      dialoguePasses: userDialoguePasses.map((p) => ({
        id: p.id,
        packId: p.packId,
        durationMinutes: p.durationMinutes,
        priceEur: p.priceEur,
        expiresAt: p.expiresAt.toISOString(),
        createdAt: p.createdAt.toISOString()
      }))
    };
  } catch (error) {
    console.error("Failed to load reserved area overview:", error);
    throw new Error("Impossibile recuperare i dati dell\u2019Area Riservata.", {
      cause: error
    });
  }
}
async function findCourseBySlug(courseSlug) {
  await ensureCatalogSeeded();
  const courseRows = await db.select().from(courses).where(eq(courses.slug, courseSlug)).limit(1);
  return courseRows[0] ?? null;
}
async function userOwnsCourse(params) {
  await ensureCatalogSeeded();
  const course = await findCourseBySlug(params.courseSlug);
  if (!course) return false;
  const dbUser = await getOrCreateUser(
    params.uid,
    params.email,
    params.displayName
  );
  const purchaseRows = await db.select({ id: coursePurchases.id }).from(coursePurchases).where(
    and(
      eq(coursePurchases.userId, dbUser.id),
      eq(coursePurchases.courseId, course.id),
      eq(coursePurchases.status, "active")
    )
  ).limit(1);
  return Boolean(purchaseRows[0]);
}
async function findCoursePurchaseByStripeSession(stripeSessionId) {
  const rows = await db.select().from(coursePurchases).where(eq(coursePurchases.stripeSessionId, stripeSessionId)).limit(1);
  return rows[0] ?? null;
}
async function enrollUserInCourse(params) {
  await ensureCatalogSeeded();
  try {
    const stripeSessionId = params.stripeSessionId.trim();
    if (!stripeSessionId) {
      throw new Error("Pagamento Stripe richiesto per attivare il percorso.");
    }
    const existingBySession = await findCoursePurchaseByStripeSession(stripeSessionId);
    if (existingBySession && existingBySession.status === "active") {
      const courseRows = await db.select().from(courses).where(eq(courses.id, existingBySession.courseId)).limit(1);
      return {
        purchase: existingBySession,
        course: courseRows[0] ?? null,
        alreadyActive: true
      };
    }
    const dbUser = await getOrCreateUser(
      params.uid,
      params.email,
      params.displayName || params.customerName
    );
    if (params.customerPhone) {
      await db.update(users).set({
        phoneWhatsapp: params.customerPhone,
        displayName: params.customerName || dbUser.displayName,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(users.id, dbUser.id));
    }
    const targetCourse = await findCourseBySlug(params.courseSlug);
    if (!targetCourse) {
      throw new Error("Percorso didattico non trovato.");
    }
    const purchaseResult = await db.insert(coursePurchases).values({
      userId: dbUser.id,
      courseId: targetCourse.id,
      status: "active",
      paymentProvider: "stripe_checkout",
      stripeSessionId,
      amountPaidEur: targetCourse.priceEur,
      customerName: params.customerName,
      customerPhone: params.customerPhone ?? null
    }).onConflictDoUpdate({
      target: [coursePurchases.userId, coursePurchases.courseId],
      set: {
        status: "active",
        stripeSessionId,
        paymentProvider: "stripe_checkout",
        amountPaidEur: targetCourse.priceEur,
        customerName: params.customerName,
        purchasedAt: /* @__PURE__ */ new Date(),
        ...params.customerPhone ? { customerPhone: params.customerPhone } : {}
      }
    }).returning();
    return {
      purchase: purchaseResult[0],
      course: targetCourse,
      alreadyActive: false
    };
  } catch (error) {
    console.error("Failed to enroll user in course:", error);
    if (error instanceof Error && (error.message === "Percorso didattico non trovato." || error.message === "Pagamento Stripe richiesto per attivare il percorso.")) {
      throw error;
    }
    throw new Error(
      "Errore durante la registrazione dell\u2019acquisto del percorso.",
      { cause: error }
    );
  }
}
function serializeUserNote(row) {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt),
    updatedAt: row.updatedAt instanceof Date ? row.updatedAt.toISOString() : String(row.updatedAt)
  };
}
async function listUserNotes(params) {
  try {
    const dbUser = await getOrCreateUser(
      params.uid,
      params.email,
      params.displayName
    );
    const rows = await db.select().from(userNotes).where(eq(userNotes.userId, dbUser.id)).orderBy(desc(userNotes.updatedAt));
    return rows.map(serializeUserNote);
  } catch (error) {
    if (isDbConnectionFailure(error)) {
      resetDbPool();
    }
    console.error("Failed to list user notes:", error);
    throw new Error("Errore durante il caricamento degli appunti.", {
      cause: error
    });
  }
}
async function createUserNote(params) {
  try {
    const dbUser = await getOrCreateUser(
      params.uid,
      params.email,
      params.displayName
    );
    const title = typeof params.title === "string" ? params.title.trim().slice(0, 200) : "";
    const body = typeof params.body === "string" ? params.body.slice(0, 5e4) : "";
    const now = /* @__PURE__ */ new Date();
    const saved = await db.insert(userNotes).values({
      userId: dbUser.id,
      title: title || "Nuovo appunto",
      body,
      createdAt: now,
      updatedAt: now
    }).returning();
    return serializeUserNote(saved[0]);
  } catch (error) {
    if (isDbConnectionFailure(error)) {
      resetDbPool();
    }
    console.error("Failed to create user note:", error);
    throw new Error("Errore durante la creazione dell\u2019appunto.", {
      cause: error
    });
  }
}
async function updateUserNote(params) {
  try {
    const dbUser = await getOrCreateUser(params.uid, params.email);
    const existing = await db.select().from(userNotes).where(
      and(eq(userNotes.id, params.noteId), eq(userNotes.userId, dbUser.id))
    ).limit(1);
    if (!existing[0]) {
      throw new Error("Appunto non trovato.");
    }
    const nextTitle = typeof params.title === "string" ? params.title.trim().slice(0, 200) : existing[0].title;
    const nextBody = typeof params.body === "string" ? params.body.slice(0, 5e4) : existing[0].body;
    const saved = await db.update(userNotes).set({
      title: nextTitle || "Senza titolo",
      body: nextBody,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(
      and(eq(userNotes.id, params.noteId), eq(userNotes.userId, dbUser.id))
    ).returning();
    return serializeUserNote(saved[0]);
  } catch (error) {
    if (error instanceof Error && error.message === "Appunto non trovato.") {
      throw error;
    }
    if (isDbConnectionFailure(error)) {
      resetDbPool();
    }
    console.error("Failed to update user note:", error);
    throw new Error("Errore durante il salvataggio dell\u2019appunto.", {
      cause: error
    });
  }
}
async function deleteUserNote(params) {
  try {
    const dbUser = await getOrCreateUser(params.uid, params.email);
    const deleted = await db.delete(userNotes).where(
      and(eq(userNotes.id, params.noteId), eq(userNotes.userId, dbUser.id))
    ).returning();
    if (!deleted[0]) {
      throw new Error("Appunto non trovato.");
    }
    return { ok: true, id: deleted[0].id };
  } catch (error) {
    if (error instanceof Error && error.message === "Appunto non trovato.") {
      throw error;
    }
    if (isDbConnectionFailure(error)) {
      resetDbPool();
    }
    console.error("Failed to delete user note:", error);
    throw new Error("Errore durante l\u2019eliminazione dell\u2019appunto.", {
      cause: error
    });
  }
}
async function updateDispensaProgress(params) {
  await ensureCatalogSeeded();
  try {
    const dbUser = await getOrCreateUser(params.uid, params.email);
    const dispensaRows = await db.select().from(dispense).where(eq(dispense.id, params.dispensaId)).limit(1);
    const targetDispensa = dispensaRows[0];
    if (!targetDispensa) {
      throw new Error("Dispensa non trovata.");
    }
    const purchaseRows = await db.select().from(coursePurchases).where(
      and(
        eq(coursePurchases.userId, dbUser.id),
        eq(coursePurchases.courseId, targetDispensa.courseId),
        eq(coursePurchases.status, "active")
      )
    ).limit(1);
    if (!purchaseRows[0]) {
      throw new Error("Acquisto richiesto per accedere a questa dispensa.");
    }
    const existingRows = await db.select().from(dispensaProgress).where(
      and(
        eq(dispensaProgress.userId, dbUser.id),
        eq(dispensaProgress.dispensaId, targetDispensa.id)
      )
    ).limit(1);
    const existing = existingRows[0];
    const nextCompleted = typeof params.completed === "boolean" ? params.completed : existing?.completed ?? false;
    const nextNotes = typeof params.personalNotes === "string" ? params.personalNotes : existing?.personalNotes ?? "";
    const saved = await db.insert(dispensaProgress).values({
      userId: dbUser.id,
      dispensaId: targetDispensa.id,
      completed: nextCompleted,
      personalNotes: nextNotes,
      updatedAt: /* @__PURE__ */ new Date()
    }).onConflictDoUpdate({
      target: [dispensaProgress.userId, dispensaProgress.dispensaId],
      set: {
        completed: nextCompleted,
        personalNotes: nextNotes,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return saved[0];
  } catch (error) {
    console.error("Failed to update dispensa progress:", error);
    if (error instanceof Error && (error.message === "Dispensa non trovata." || error.message === "Acquisto richiesto per accedere a questa dispensa.")) {
      throw error;
    }
    throw new Error("Errore durante il salvataggio degli appunti di studio.", {
      cause: error
    });
  }
}
async function listOccupiedSlots(fromIso, toIso) {
  try {
    const rows = await db.select({
      scheduledDate: consultationBookings.scheduledDate,
      scheduledTime: consultationBookings.scheduledTime
    }).from(consultationBookings).where(
      and(
        gte(consultationBookings.scheduledDate, fromIso),
        lte(consultationBookings.scheduledDate, toIso),
        inArray(consultationBookings.status, [
          "pending_payment",
          "confirmed"
        ])
      )
    );
    const fromDb = rows.map((row) => ({
      dateIso: row.scheduledDate,
      slot: row.scheduledTime
    }));
    let fromCalendar = [];
    try {
      const busyKeys = await fetchGoogleBusySlotKeys(fromIso, toIso);
      fromCalendar = busyKeys.map((key) => {
        const [dateIso, slot] = key.split("|");
        return { dateIso, slot };
      });
    } catch (error) {
      console.error("Google FreeBusy merge skipped:", error);
    }
    const seen = /* @__PURE__ */ new Set();
    const merged = [];
    for (const item of [...fromDb, ...fromCalendar]) {
      const key = occupiedKey(item.dateIso, item.slot);
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push(item);
    }
    return merged;
  } catch (error) {
    console.error("Failed to list occupied slots:", error);
    throw new Error("Impossibile caricare la disponibilit\xE0.", { cause: error });
  }
}
async function isSlotTaken(scheduledDate, scheduledTime, excludeBookingId) {
  const conditions = [
    eq(consultationBookings.scheduledDate, scheduledDate),
    eq(consultationBookings.scheduledTime, scheduledTime),
    inArray(consultationBookings.status, ["pending_payment", "confirmed"])
  ];
  if (excludeBookingId != null) {
    conditions.push(ne(consultationBookings.id, excludeBookingId));
  }
  const rows = await db.select({ id: consultationBookings.id }).from(consultationBookings).where(and(...conditions)).limit(1);
  return rows.length > 0;
}
async function createConsultationBooking(params) {
  try {
    const tariff = resolveBookingTariff(params.tariffId);
    if (!tariff) {
      throw new Error("Tariffa consulto non valida.");
    }
    if (await isSlotTaken(params.scheduledDate, params.scheduledTime)) {
      throw new Error("SLOT_TAKEN");
    }
    let dbUserId = null;
    if (params.uid) {
      const dbUser = await getOrCreateUser(
        params.uid,
        params.authEmail || params.email,
        params.fullName
      );
      dbUserId = dbUser.id;
    }
    const mode = resolveBookingMode(
      params.mode || "remote",
      params.scheduledTime
    );
    const status = params.status || "pending_payment";
    const result = await db.insert(consultationBookings).values({
      userId: dbUserId,
      tariffId: tariff.id,
      durationMinutes: tariff.durationMinutes,
      priceEur: tariff.priceEur,
      scheduledDate: params.scheduledDate,
      scheduledTime: params.scheduledTime,
      fullName: params.fullName,
      email: params.email,
      phoneWhatsapp: params.phoneWhatsApp,
      sessionIntent: params.sessionIntent,
      deontologyAccepted: params.deontologyAccepted,
      mode,
      status,
      stripeSessionId: params.stripeSessionId ?? null,
      paidAt: status === "confirmed" ? /* @__PURE__ */ new Date() : null
    }).returning();
    return result[0];
  } catch (error) {
    console.error("Failed to create booking:", error);
    if (error instanceof Error && (error.message === "Tariffa consulto non valida." || error.message === "SLOT_TAKEN")) {
      throw error;
    }
    const pgCode = error && typeof error === "object" && "code" in error ? String(error.code) : "";
    if (pgCode === "23505") {
      throw new Error("SLOT_TAKEN");
    }
    throw new Error("Impossibile registrare la prenotazione.", { cause: error });
  }
}
async function attachStripeSessionToBooking(bookingId, stripeSessionId) {
  const result = await db.update(consultationBookings).set({
    stripeSessionId,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(consultationBookings.id, bookingId)).returning();
  return result[0] ?? null;
}
async function cancelPendingBooking(bookingId) {
  const result = await db.update(consultationBookings).set({ status: "cancelled", updatedAt: /* @__PURE__ */ new Date() }).where(
    and(
      eq(consultationBookings.id, bookingId),
      eq(consultationBookings.status, "pending_payment")
    )
  ).returning();
  return result[0] ?? null;
}
async function getBookingById(bookingId) {
  const rows = await db.select().from(consultationBookings).where(eq(consultationBookings.id, bookingId)).limit(1);
  return rows[0] ?? null;
}
async function getBookingByStripeSessionId(stripeSessionId) {
  const rows = await db.select().from(consultationBookings).where(eq(consultationBookings.stripeSessionId, stripeSessionId)).limit(1);
  return rows[0] ?? null;
}
async function confirmConsultationBooking(params) {
  let booking = params.stripeSessionId != null ? await getBookingByStripeSessionId(params.stripeSessionId) : null;
  if (!booking && params.bookingId != null) {
    booking = await getBookingById(params.bookingId);
  }
  if (!booking) {
    throw new Error("Prenotazione non trovata.");
  }
  if (booking.status === "confirmed") {
    return { booking, fulfilled: false };
  }
  if (booking.status === "cancelled" && !params.stripeSessionId) {
    throw new Error("Prenotazione annullata.");
  }
  const updated = await db.update(consultationBookings).set({
    status: "confirmed",
    stripeSessionId: params.stripeSessionId || booking.stripeSessionId,
    stripePaymentIntentId: params.transactionId || booking.stripePaymentIntentId,
    paidAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date(),
    mode: resolveBookingMode(booking.mode || "remote", booking.scheduledTime)
  }).where(
    and(
      eq(consultationBookings.id, booking.id),
      or(
        eq(consultationBookings.status, "pending_payment"),
        eq(consultationBookings.status, "cancelled")
      )
    )
  ).returning();
  const confirmed = updated[0];
  if (!confirmed) {
    const again = await getBookingById(booking.id);
    if (again?.status === "confirmed") {
      return { booking: again, fulfilled: false };
    }
    throw new Error("Impossibile confermare la prenotazione.");
  }
  const { calendarEventId } = await fulfillConfirmedBooking(confirmed, {
    customerEmail: params.customerEmail || confirmed.email,
    transactionId: params.transactionId || params.stripeSessionId || confirmed.stripeSessionId || String(confirmed.id),
    amountCents: params.amountCents
  });
  if (calendarEventId) {
    const withEvent = await db.update(consultationBookings).set({
      googleCalendarEventId: calendarEventId,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(consultationBookings.id, confirmed.id)).returning();
    return { booking: withEvent[0] ?? confirmed, fulfilled: true };
  }
  return { booking: confirmed, fulfilled: true };
}
function computeDialogueStatus(row, now) {
  const nowMs = now.getTime();
  const paidExpiryMs = row.activePassExpiresAt ? row.activePassExpiresAt.getTime() : 0;
  const freeExpiryMs = row.freeTrialExpiresAt ? row.freeTrialExpiresAt.getTime() : 0;
  let mode = "ready";
  let remainingSeconds = FREE_TRIAL_SECONDS;
  let expiresAtIso = null;
  if (paidExpiryMs > nowMs) {
    mode = "paid_pass";
    remainingSeconds = Math.max(0, Math.ceil((paidExpiryMs - nowMs) / 1e3));
    expiresAtIso = row.activePassExpiresAt.toISOString();
  } else if (row.freeTrialStartedAt && row.freeTrialExpiresAt) {
    if (freeExpiryMs > nowMs) {
      mode = "free_trial";
      remainingSeconds = Math.max(0, Math.ceil((freeExpiryMs - nowMs) / 1e3));
      expiresAtIso = row.freeTrialExpiresAt.toISOString();
    } else {
      mode = "expired";
      remainingSeconds = 0;
      expiresAtIso = row.freeTrialExpiresAt.toISOString();
    }
  }
  return {
    sessionKey: row.sessionKey,
    mode,
    remainingSeconds,
    freeTrialSecondsTotal: FREE_TRIAL_SECONDS,
    freeTrialUsed: Boolean(row.freeTrialStartedAt),
    activePackId: mode === "paid_pass" ? row.activePackId ?? null : null,
    expiresAtIso,
    interactionsCount: row.interactionsCount,
    serverTimeIso: now.toISOString()
  };
}
async function resolveOrCreateDialogueSession(params) {
  let dbUserId = null;
  if (params.uid) {
    const dbUser = await getOrCreateUser(
      params.uid,
      params.authEmail || "",
      params.authName ?? null
    );
    dbUserId = dbUser.id;
  }
  if (dbUserId) {
    const userSessionRows = await db.select().from(dialogueSessions).where(eq(dialogueSessions.userId, dbUserId)).orderBy(desc(dialogueSessions.updatedAt)).limit(1);
    if (userSessionRows[0]) {
      return { session: userSessionRows[0], dbUserId };
    }
  }
  const existingByKey = await db.select().from(dialogueSessions).where(eq(dialogueSessions.sessionKey, params.sessionKey)).limit(1);
  if (existingByKey[0]) {
    if (dbUserId && !existingByKey[0].userId) {
      const updated = await db.update(dialogueSessions).set({ userId: dbUserId, updatedAt: /* @__PURE__ */ new Date() }).where(eq(dialogueSessions.id, existingByKey[0].id)).returning();
      return { session: updated[0], dbUserId };
    }
    return { session: existingByKey[0], dbUserId };
  }
  const created = await db.insert(dialogueSessions).values({
    sessionKey: params.sessionKey,
    userId: dbUserId,
    interactionsCount: 0
  }).returning();
  return { session: created[0], dbUserId };
}
async function getDialogueAccessStatus(params) {
  const { session } = await resolveOrCreateDialogueSession(params);
  return computeDialogueStatus(session, /* @__PURE__ */ new Date());
}
async function recordDialogueInteraction(params) {
  const { session } = await resolveOrCreateDialogueSession(params);
  const now = /* @__PURE__ */ new Date();
  const current = computeDialogueStatus(session, now);
  if (current.mode === "expired") {
    return { allowed: false, status: current };
  }
  if (current.mode === "ready") {
    const trialExpires = new Date(now.getTime() + FREE_TRIAL_SECONDS * 1e3);
    const updatedRows2 = await db.update(dialogueSessions).set({
      freeTrialStartedAt: now,
      freeTrialExpiresAt: trialExpires,
      interactionsCount: session.interactionsCount + 1,
      updatedAt: now
    }).where(eq(dialogueSessions.id, session.id)).returning();
    const updated2 = updatedRows2[0] ?? session;
    return {
      allowed: true,
      status: computeDialogueStatus(updated2, now)
    };
  }
  const updatedRows = await db.update(dialogueSessions).set({
    interactionsCount: session.interactionsCount + 1,
    updatedAt: now
  }).where(eq(dialogueSessions.id, session.id)).returning();
  const updated = updatedRows[0] ?? session;
  return {
    allowed: true,
    status: computeDialogueStatus(updated, now)
  };
}
async function unlockDialogueTimePack(params) {
  const pack = DIALOGUE_PACK_CATALOG[params.packId];
  if (!pack) {
    throw new Error("Pacchetto temporale non valido.");
  }
  const stripeSessionId = params.stripeSessionId.trim();
  if (!stripeSessionId) {
    throw new Error("Pagamento Stripe richiesto per attivare il pass.");
  }
  const { session, dbUserId } = await resolveOrCreateDialogueSession({
    sessionKey: params.sessionKey,
    uid: params.uid,
    authEmail: params.authEmail,
    authName: params.authName || params.customerName
  });
  const existingPurchase = await db.select().from(dialoguePurchases).where(eq(dialoguePurchases.stripeSessionId, stripeSessionId)).limit(1);
  if (existingPurchase[0]) {
    const now2 = /* @__PURE__ */ new Date();
    if (existingPurchase[0].expiresAt.getTime() > now2.getTime() && (!session.activePassExpiresAt || session.activePassExpiresAt.getTime() < existingPurchase[0].expiresAt.getTime())) {
      const refreshed = await db.update(dialogueSessions).set({
        activePassExpiresAt: existingPurchase[0].expiresAt,
        activePackId: existingPurchase[0].packId,
        updatedAt: now2
      }).where(eq(dialogueSessions.id, session.id)).returning();
      return {
        status: computeDialogueStatus(refreshed[0] ?? session, now2),
        purchase: existingPurchase[0]
      };
    }
    return {
      status: computeDialogueStatus(session, /* @__PURE__ */ new Date()),
      purchase: existingPurchase[0]
    };
  }
  const now = /* @__PURE__ */ new Date();
  const baseMs = session.activePassExpiresAt && session.activePassExpiresAt.getTime() > now.getTime() ? session.activePassExpiresAt.getTime() : now.getTime();
  const newExpiresAt = new Date(baseMs + pack.durationMinutes * 60 * 1e3);
  const updatedSessionRows = await db.update(dialogueSessions).set({
    activePassExpiresAt: newExpiresAt,
    activePackId: pack.id,
    updatedAt: now
  }).where(eq(dialogueSessions.id, session.id)).returning();
  const purchaseRows = await db.insert(dialoguePurchases).values({
    dialogueSessionId: session.id,
    userId: dbUserId,
    packId: pack.id,
    durationMinutes: pack.durationMinutes,
    priceEur: pack.priceEur,
    stripePriceId: pack.stripePriceId,
    stripeSessionId,
    customerName: params.customerName,
    customerEmail: params.customerEmail,
    expiresAt: newExpiresAt
  }).returning();
  const updatedSession = updatedSessionRows[0] ?? session;
  return {
    status: computeDialogueStatus(updatedSession, now),
    purchase: purchaseRows[0]
  };
}
var FREE_TRIAL_SECONDS, DIALOGUE_PACK_CATALOG;
var init_repository = __esm({
  "src/db/repository.ts"() {
    init_drizzle_orm();
    init_db2();
    init_schema2();
    init_courseCatalog();
    init_paymentCatalog();
    init_bookingRules();
    init_bookingSlots();
    init_bookingFulfillment();
    init_googleCalendar();
    init_courseCatalog();
    FREE_TRIAL_SECONDS = 300;
    DIALOGUE_PACK_CATALOG = {
      "5m": {
        id: "5m",
        title: "Pass Rapido \xB7 5 Minuti",
        durationMinutes: 5,
        priceEur: 3,
        stripePriceId: process.env.STRIPE_PRICE_ID_DIALOGO_5M || "STRIPE_PRICE_ID_DIALOGO_5M"
      },
      "10m": {
        id: "10m",
        title: "Pass Luce \xB7 10 Minuti",
        durationMinutes: 10,
        priceEur: 5,
        stripePriceId: process.env.STRIPE_PRICE_ID_DIALOGO_10M || "STRIPE_PRICE_ID_DIALOGO_10M"
      },
      "15m": {
        id: "15m",
        title: "Pass Cosmos \xB7 15 Minuti",
        durationMinutes: 15,
        priceEur: 7,
        stripePriceId: process.env.STRIPE_PRICE_ID_DIALOGO_15M || "STRIPE_PRICE_ID_DIALOGO_15M"
      }
    };
  }
});

// src/data/ninaMaggioriCards.generated.ts
var NINA_MAGGIORI_CARDS_GENERATED = [
  {
    "id": 0,
    "roman": "0",
    "title": "Il Matto",
    "aliases": [
      "matto",
      "il matto",
      "fool"
    ],
    "body": "### 0. Il Matto \u2014 L\u2019Inizio Non Condizionato\n- **Simbologia**: Il Matto (0) rappresenta la soglia fuori dalla numerazione sequenziale; passo sul precipizio; libert\xE0 assoluta. Precede ogni schema, regola o sovrastruttura mentale: energia pura prima di ogni cristallizzazione materiale. **Waite**: Un giovane vestito con abiti ricchi e colorati cammina spensierato sull'orlo di un precipizio. \xB7 Lo sguardo \xE8 rivolto verso l'alto, mentre il passo avanza lungo il bordo del dirupo. \xB7 Porta su una spalla un bastone a cui \xE8 appesa una piccola sacca e tiene nella mano destra una rosa bianca. \xB7 Un piccolo cane bianco gli salta accanto e un sole luminoso sple\u2026\n- **Senso**: slancio genuino, apertura incondizionata al nuovo, coraggio di slegarsi dai condizionamenti, fiducia nel cammino. Ogni inizio autentico richiede il rischio dell'ignoto e lo spogliamento dalle protezioni superflue.\n- **Luce/ombra**: Luce \u2014 Segna l'inizio di un percorso nuovo, una scelta che rompe con la routine, un viaggio o una decisione coraggiosa e fuori dagli schemi. Ombra \u2014 Invita a ritrovare leggerezza e apertura mentale, p\u2026"
  },
  {
    "id": 1,
    "roman": "I",
    "title": "Il Bagatto",
    "aliases": [
      "bagatto",
      "il bagatto",
      "mago",
      "magician"
    ],
    "body": "### I. Il Bagatto \u2014 L\u2019Iniziativa e il Talento\n- **Simbologia**: Situato alla guida della numerazione, il Bagatto (o Giocoliere) dispone sul banco di tutti gli strumenti primari (bastoni, coppe, spade e denari). \xC8 il padrone delle risorse operative e delle potenzialit\xE0 materiali per cominciare subito. **Waite**: Un giovane uomo dal portamento sicuro \xE8 in piedi dietro un tavolo, vestito con una tunica bianca stretta in vita e un mantello rosso drappeggiato sulle spalle. \xB7 Il volto \xE8 rivolto frontalmente verso l'osservatore con espressione concentrata; il braccio destro \xE8 levato verso l'alto e impugna una bacchetta bianca a due punte, mentre l'indice della mano sin\u2026\n- **Senso**: iniziativa immediata, talento puro, destrezza, attivazione dei processi con ci\xF2 che \xE8 gi\xE0 disponibile, senza attendere condizioni ideali.\n- **Luce/ombra**: Luce \u2014 Segna il momento in cui l'energia libera diventa volont\xE0 consapevole, iniziativa mirata, padronanza delle proprie capacit\xE0 e avvio concreto di un progetto grazie agli strumenti gi\xE0 a disposizione. Ombra \u2014 Invita a verificare che la destrezza e il pote\u2026"
  },
  {
    "id": 2,
    "roman": "II",
    "title": "La Papessa",
    "aliases": [
      "papessa",
      "la papessa",
      "sacerdotessa",
      "high priestess"
    ],
    "body": "### II. La Papessa \u2014 Gestazione e Saggezza del Silenzio\n- **Simbologia**: Seduta immobile e velata tra i pilastri del tempio, con il sacro libro chiuso o socchiuso; custodisce la conoscenza sottile senza agire all'esterno. **Waite**: Una donna maestosa e solenne siede immobile su un trono in pietra, avvolta in un ampio mantello blu che scende fino ai piedi e in una veste chiara decorata con una grande croce solare dorata sul petto. \xB7 Il volto \xE8 rivolto frontalmente con espressione calma, raccolta e impassibile; le mani sono posate con compostezza in grembo, mentre ai piedi si distende\u2026\n- **Senso**: gestazione silenziosa, verit\xE0 intuita prima di essere detta, sapienza del tempo, attesa fertile. Ogni vera creazione richiede raccoglimento e maturazione interiore.\n- **Luce/ombra**: Luce \u2014 Segna un momento di ascolto interiore, intuizione lucidamente percepita, studio approfondito, riservatezza strategica e maturazione silenziosa prima di agire. Ombra \u2014 Invita a distinguere tra saggia prudenza/custodia interiore e chiusura eccessiva, passivit\xE0, segreto tenace o elusione del confronto con\u2026"
  },
  {
    "id": 3,
    "roman": "III",
    "title": "L\u2019Imperatrice",
    "aliases": [
      "imperatrice",
      "l'imperatrice",
      "empress"
    ],
    "body": "### III. L\u2019Imperatrice \u2014 Fioritura e Abbondanza\n- **Simbologia**: fioritura sensibile, abbondanza generativa, capacit\xE0 di dare forma e vita alle idee con espressivit\xE0, comunicazione e cura fertile dei progetti. **Waite**: Una donna regale e sensuale, dal portamento rilassato e accogliente, siede su un ampio cuscino morbido in una radura boschiva, indossando una veste ampia e fluente ornata da melagrane. \xB7 Il volto \xE8 rivolto verso l'osservatore con un'espressione serena, materna e appagata; il busto \xE8 leggermente reclinato all'indietro e una mano poggia con naturalezza sul\u2026\n- **Senso**: vitalit\xE0 rigogliosa, espressione creativa senza vincoli, potere generativo della parola; armonia che trasforma l'impulso in manifestazione ricca.\n- **Luce/ombra**: Luce \u2014 Segna un momento di fertilit\xE0 creativa o materiale, cura, crescita armoniosa, sensualit\xE0, abbondanza e maturazione naturale di ci\xF2 che \xE8 stato seminato. Ombra \u2014 Invita a distinguere tra l'abbondanza che nutre e l'eccesso che appesantisce, come iperprotettivit\xE0, dipendenza affettiva, pigrizia o dispersione nell'indulgere.\n- **Previsio\u2026"
  },
  {
    "id": 4,
    "roman": "IV",
    "title": "L\u2019Imperatore",
    "aliases": [
      "imperatore",
      "l'imperatore",
      "emperor"
    ],
    "body": "### IV. L\u2019Imperatore \u2014 Stabilit\xE0 e Metodo\n- **Simbologia**: autorit\xE0 e concretezza; stabilit\xE0, metodo rigoroso, confini solidi, gestione organizzata del mondo materiale. **Waite**: Un sovrano maturo e severo siede dritto su un trono massiccio in pietra, ornato da quattro teste d'ariete; indossa un'armatura sotto un mantello rosso. \xB7 La postura \xE8 eretta e ferma sul trono; l'espressione \xE8 severa e autorevole, senza concessioni al rilassamento o alla sensualit\xE0 dell'Imperatrice. \xB7 Nella mano destra tiene uno scettro sormontato da una c\u2026\n- **Senso**: autorit\xE0 saggia, protezione, governo della realt\xE0 senza tentennamenti; forza strutturale per dare durata e confini certi a quanto creato.\n- **Luce/ombra**: Luce \u2014 Quando questa carta compare in una stesa, indica la necessit\xE0 di strutturare un progetto, di fissare confini netti, di agire con pragmatismo e leadership, oppure la presenza di una figura autorevole o paterna che offre protezione e regole solide. Ombra \u2014 All'interno di una stesa, questa lama indica il bisogno di darsi regole chiare, di assumere una responsabilit\xE0 concreta, di cons\u2026"
  },
  {
    "id": 5,
    "roman": "V",
    "title": "Il Papa",
    "aliases": [
      "il papa",
      "papa",
      "ierofante",
      "hierophant"
    ],
    "body": "### V. Il Papa \u2014 Patto Etico e Guida\n- **Simbologia**: guida spirituale o professionale; maestro che trasmette valori condivisi e facilita l'adesione a regole e principi codificati. **Waite**: Una figura sacra siede tra due colonne grigie su un podio elevato, indossando un triregno a tre livelli, una casula rossa e un camice bianco. \xB7 Con la mano destra compie un gesto di benedizione o insegnamento (con due dita alzate e due piegate), mentre nella sinistra regge un bastone papale a tripla croce. \xB7 Nella sinistra regge un bastone papale a tripla\u2026\n- **Senso**: patto etico, trasmissione della sapienza, mediazione illuminata; alleanza tra aspirazioni individuali e tradizione o struttura sociale.\n- **Luce/ombra**: Luce \u2014 Quando questa carta compare in una stesa, indica un percorso di studio o formazione, il consiglio di un mentore o di una figura esperta, il rispetto di principi etici o istituzionali, oppure l'invito a dare coerenza e metodo al proprio cammino. Ombra \u2014 All'interno di una stesa, questa lama indica il valore dello studio metodico, l'incontro con un maestro o una guida, l'a\u2026"
  },
  {
    "id": 6,
    "roman": "VI",
    "title": "Gli Amanti",
    "aliases": [
      "amanti",
      "gli amanti",
      "innamorati",
      "lovers"
    ],
    "body": "### VI. Gli Amanti \u2014 Il Bivio e la Scelta del Cuore\n- **Simbologia**: la figura umana al bivio, di fronte all'incontro, all'affetto e alla responsabilit\xE0 della decisione. **Waite**: Un uomo e una donna stanno nudi l'uno di fronte all'altra in un paesaggio paradisiaco e luminoso. \xB7 La nudit\xE0 e la prossimit\xE0 dei due personaggi indicano l'apertura, la vulnerabilit\xE0 e l'unione tra opposti che si riconoscono senza maschere. \xB7 Alle spalle dell'uomo si erge l'albero della vita con dodici fiamme, mentre alle spalle della donna si innalza l'a\u2026\n- **Senso**: scelta consapevole del cuore e responsabilit\xE0 verso la propria direzione emotiva ed esistenziale; optare con convinzione per una strada escludendo le altre.\n- **Luce/ombra**: Luce \u2014 Quando questa carta compare in una stesa, indica una scelta importante dettata dal cuore o da un'adesione interiore profonda, una relazione significativa o una partnership basata sull'armonia e sulla risonanza, oppure il momento di assumersi la responsabilit\xE0 di un bivio evitando di delegare la decisione ad autorit\xE0 esterne. Ombra \u2014 All'interno di una stesa, qu\u2026"
  },
  {
    "id": 7,
    "roman": "VII",
    "title": "Il Carro",
    "aliases": [
      "il carro",
      "carro",
      "chariot"
    ],
    "body": "### VII. Il Carro \u2014 Azione Coordinata e Vittoria\n- **Simbologia**: il condottiero guida il Carro trionfale e governa con maestria le forze opposte che muovono il veicolo. **Waite**: Un giovane condottiero coronato, con una stella a otto punte sulla fronte e una corazza decorata con mezze lune, siede eretto su un carro di pietra aperto, tenendo nella mano destra uno scettro e mantenendo una postura ferma e centrata nonostante il movimento. \xB7 Il carro \xE8 sormontato da un baldacchino a quattro colonne sostenuto da un drappo stellato blu\u2026\n- **Senso**: azione coordinata, controllo sapiente delle polarit\xE0 energetiche, vittoria grazie a determinazione e rigore.\n- **Luce/ombra**: Luce \u2014 Quando questa carta compare in una stesa, indica il superamento di un ostacolo attraverso la determinazione, la spinta verso un obiettivo concreto, la gestione di tensioni interne o esterne e il viaggio \u2014 fisico, professionale o evolutivo \u2014 che porta a una conquista. Ombra \u2014 All'interno di una stesa, questa lama incarna la traduzione di una decisione in movimento deciso, direzione mirata, avanzamento, control\u2026"
  },
  {
    "id": 8,
    "roman": "VIII",
    "title": "La Giustizia",
    "aliases": [
      "giustizia",
      "la giustizia",
      "justice"
    ],
    "body": "### VIII. La Giustizia \u2014 Ordine e Causa-Effetto\n- **Simbologia**: figura regale in trono, spada verticale e bilancia in equilibrio; ordine cosmico, imparzialit\xE0 e linearit\xE0 delle conseguenze.\n- **Senso**: responsabilit\xE0, onest\xE0 intellettuale, equilibrio, rigore etico. Ogni azione genera conseguenza; la chiarezza mentale guida l'emotivit\xE0.\n- **Previsione**: questioni legali o burocratiche, contratti equi, necessit\xE0 di fare ordine, risposta meritata e oggettiva."
  },
  {
    "id": 9,
    "roman": "IX",
    "title": "L\u2019Eremita",
    "aliases": [
      "eremita",
      "l'eremita",
      "hermit"
    ],
    "body": "### IX. L\u2019Eremita \u2014 Luce Interiore\n- **Simbologia**: saggio nel mantello, lanterna nella notte; protegge e illumina il cammino.\n- **Senso**: raccoglimento, solitudine rigenerante, ricerca della verit\xE0 interiore, prudenza; distacco temporaneo dal frastuono per trovare risposte autentiche.\n- **Previsione**: rallentamento, studio, introspezione, cautela e riserbo, senza affrettare i tempi."
  },
  {
    "id": 10,
    "roman": "X",
    "title": "La Ruota di Fortuna",
    "aliases": [
      "ruota di fortuna",
      "ruota della fortuna",
      "wheel of fortune"
    ],
    "body": "### X. La Ruota di Fortuna \u2014 Ciclo e Mutamento\n- **Simbologia**: ruota in movimento e figure in evoluzione; cicli vitali e mutevolezza delle circostanze.\n- **Senso**: accettazione del cambiamento, ciclicit\xE0, sblocco della stagnazione; adattarsi con flessibilit\xE0.\n- **Previsione**: svolta improvvisa, colpo di scena, nuovo ciclo, ribaltamento rapido di una situazione bloccata."
  },
  {
    "id": 11,
    "roman": "XI",
    "title": "La Forza",
    "aliases": [
      "la forza",
      "forza",
      "strength"
    ],
    "body": "### XI. La Forza \u2014 Dominio Istintivo\n- **Simbologia**: una donna apre o chiude con dolcezza le fauci di un leone, senza violenza.\n- **Senso**: dominio delle passioni tramite consapevolezza, coraggio interiore, pazienza, gestione saggia dell'energia; integrare gli impulsi anzich\xE9 reprimerli.\n- **Previsione**: superare una prova complessa con determinazione e autocontrollo; armonia nelle tensioni."
  },
  {
    "id": 12,
    "roman": "XII",
    "title": "L\u2019Appeso",
    "aliases": [
      "appeso",
      "l'appeso",
      "hanged man"
    ],
    "body": "### XII. L\u2019Appeso \u2014 Sosta e Cambio di Prospettiva\n- **Simbologia**: figura a testa in gi\xF9, serena; l'energia fluisce verso l'alto.\n- **Senso**: sosta necessaria, sacrificio come \xABrendere sacro\xBB, rinuncia al controllo rigido, capovolgimento di sguardo.\n- **Previsione**: blocco o attesa utile a riconsiderare le priorit\xE0, lasciando andare la fretta e accettando la pausa."
  },
  {
    "id": 13,
    "roman": "XIII",
    "title": "La Morte",
    "aliases": [
      "la morte",
      "morte",
      "death",
      "arcano senza nome",
      "senza nome"
    ],
    "body": "### XIII. La Morte \u2014 Trasmutazione\n- **Simbologia**: scheletro che falcia; dal terreno emergono germogli; potatura indispensabile alla vita.\n- **Senso**: fine radicale di un ciclo, distacco da ci\xF2 che \xE8 obsoleto, trasformazione e rinascita per fare spazio al nuovo.\n- **Previsione**: chiusura netta e cambiamento drastico; se accolto senza resistenza, apre a rinnovamento totale."
  },
  {
    "id": 14,
    "roman": "XIV",
    "title": "La Temperanza",
    "aliases": [
      "temperanza",
      "la temperanza",
      "temperance"
    ],
    "body": "### XIV. La Temperanza \u2014 Alchimia e Moderazione\n- **Simbologia**: figura alata che travasa liquido tra due vasi; flusso continuo di armonia.\n- **Senso**: misura, guarigione, pazienza alchemica, riconciliazione, compromesso e pace interiore.\n- **Previsione**: risoluzione pacifica, cure efficaci, tempi di recupero fluidi, fase di stabilizzazione in cui regna la cooperazione."
  },
  {
    "id": 15,
    "roman": "XV",
    "title": "Il Diavolo",
    "aliases": [
      "diavolo",
      "il diavolo",
      "devil"
    ],
    "body": "### XV. Il Diavolo \u2014 Ombra, Materia e Fascino del Potere\n- **Simbologia**: creatura alata su due figure legate in modo blando ma consenziente.\n- **Senso**: confronto con l'Ombra, attaccamento alla materia, passioni, denaro, dipendenze, falsi poteri. Riconoscere i desideri inconsci per riprendere il controllo. Mette l'allievo a confronto diretto con la propria Ombra, le passioni viscerali, i condizionamenti materiali, le dipendenze e i falsi poteri a cui ci si assoggetta in modo consenziente. In chiave pratica, segnala dinamiche di manipolazione o attaccamenti tossici da cui \xE8 necessario riprendere il controllo.\n- **Pratica corso**: Diagnosi dell'Ombra (Il Diavolo) \u2014 Riconosci dove stai cedendo la tua autonomia in cambio di sicurezza o profitto immediato, identificando i vincoli a cui stai acconsentendo per timore.\n- **Previsione**: passioni forti, dinamiche di potere o manipolazione, profitto materiale; necessit\xE0 di liberarsi da legami tossici."
  },
  {
    "id": 16,
    "roman": "XVI",
    "title": "La Torre",
    "aliases": [
      "la torre",
      "torre",
      "tower"
    ],
    "body": "### XVI. La Torre \u2014 Folgore e Liberazione\n- **Simbologia**: torre colpita dal fulmine; corona che salta; figure che precipitano tra scintille.\n- **Senso**: rottura delle false certezze, crollo di strutture non pi\xF9 aderenti alla verit\xE0, liberazione catartica attraverso la crisi. Interviene con una folgore liberatoria che fa crollare le strutture rigide e le false certezze costruite sull'illusione. Sebbene vissuta come una crisi dirompente, rappresenta una rottura indispensabile per spezzare la stagnazione e ripartire dall'autenticit\xE0.\n- **Pratica corso**: Gestione della crisi (La Torre) \u2014 Se la struttura rigida crolla all'improvviso (un imprevisto lavorativo o una rottura), evita di tentare di ricostruire le vecchie certezze illusorie. Accogli la rottura come una liberazione catartica indispensabile per ricostruire su basi di reale autenticit\xE0.\n- **Previsione**: cambiamento drastico e inatteso che rompe la stagnazione e libera nuove energie."
  },
  {
    "id": 17,
    "roman": "XVII",
    "title": "Le Stelle",
    "aliases": [
      "le stelle",
      "stelle",
      "la stella",
      "the star"
    ],
    "body": "### XVII. Le Stelle \u2014 Speranza e Guarigione\n- **Simbologia**: figura nuda che versa linfa su terra e acqua, sotto stelle radiose.\n- **Senso**: guida celeste, fiducia, chiarezza d'intenti, ispirazione, guarigione dopo la Torre. Portano la grazia, la speranza e la guarigione dopo la tempesta della Torre. Rappresentano la connessione diretta con il proprio talento originario, infondendo fiducia nel futuro e ispirazione creativa.\n- **Previsione**: serenit\xE0 ritrovata, prospettive favorevoli, successo creativo, protezione, conferma del cammino."
  },
  {
    "id": 18,
    "roman": "XVIII",
    "title": "La Luna",
    "aliases": [
      "la luna",
      "luna",
      "the moon"
    ],
    "body": "### XVIII. La Luna \u2014 Inconscio e Percorso Notturno\n- **Simbologia**: Luna piena, gambero dalle acque, lupi e torri lontane.\n- **Senso**: regno dell'inconscio, sogni, paure ancestrali, intuito viscerale, illusioni e nebbie da attraversare con la luce interiore. Immerge il viandante nel regno dell'inconscio, dei sogni e delle paure ancestrali. Insegna a navigare le nebbie emotive e le illusioni ascoltando l'intuito profondo, senza farsi paralizzare dalle ansie.\n- **Previsione**: incertezza, segreti, malintesi; procedere ascoltando l'istinto senza paralisi ansiosa."
  },
  {
    "id": 19,
    "roman": "XIX",
    "title": "Il Sole",
    "aliases": [
      "il sole",
      "sole",
      "the sun"
    ],
    "body": "### XIX. Il Sole \u2014 Chiarezza e Realizzazione\n- **Simbologia**: Sole radioso; bambini festosi in un prato fiorito.\n- **Senso**: verit\xE0 svelata, gioia, trasparenza, calore umano, successo pubblico, vitalit\xE0 cosciente. Rappresenta la verit\xE0 svelata, la gioia radiosa, la trasparenza e la realizzazione visibile. Dissipa ogni ombra, garantendo chiarezza nei rapporti, vitalit\xE0 e successo pubblico.\n- **Previsione**: successo, chiarezza nei rapporti, accordi fortunati, vitalit\xE0, trionfo di un progetto portato alla luce."
  },
  {
    "id": 20,
    "roman": "XX",
    "title": "Il Giudizio",
    "aliases": [
      "il giudizio",
      "giudizio",
      "judgement",
      "judgment"
    ],
    "body": "### XX. Il Giudizio \u2014 Chiamata e Risveglio\n- **Simbologia**: angelo con tromba; figure che emergono dai sepolcri, braccia aperte.\n- **Senso**: chiamata alla consapevolezza, risveglio, perdono, liberazione dai giudizi limitanti. Suona la chiamata alla consapevolezza e al risveglio spirituale. Invita al perdono e alla liberazione dai vecchi giudizi limitanti, permettendo di rinascere a una nuova vita.\n- **Previsione**: svolta decisiva, notizie importanti, riconciliazione che rinnova l'esistenza."
  },
  {
    "id": 21,
    "roman": "XXI",
    "title": "Il Mondo",
    "aliases": [
      "il mondo",
      "mondo",
      "the world"
    ],
    "body": "### XXI. Il Mondo \u2014 Compiutezza\n- **Simbologia**: figura danzante nella mandorla di foglie, circondata dai quattro viventi (Toro, Leone, Aquila, Angelo).\n- **Senso**: Compimento dell'Opera, integrazione dei settenari, realizzazione e armonia universale. Costituisce il coronamento trionfante e la compiutezza del Grande Opera. Simboleggia l'integrazione armonica di tutte le tappe vissute nei tre settenari e il compimento perfetto della ricerca.\n- **Previsione**: successo totale, chiusura trionfante di un ciclo, viaggi internazionali, massima espansione."
  }
];

// src/lib/ninaReplyLang.ts
var NINA_REPLY_LANG_LABELS = {
  it: "italiano",
  en: "English",
  es: "espa\xF1ol",
  fr: "fran\xE7ais",
  de: "Deutsch",
  pt: "portugu\xEAs",
  "zh-cn": "\u4E2D\u6587\uFF08\u7B80\u4F53\uFF09",
  zh: "\u4E2D\u6587\uFF08\u7B80\u4F53\uFF09",
  ja: "\u65E5\u672C\u8A9E",
  ar: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
  ru: "\u0440\u0443\u0441\u0441\u043A\u0438\u0439",
  uk: "\u0443\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
  pl: "polski",
  nl: "Nederlands",
  ro: "rom\xE2n\u0103",
  sv: "svenska",
  tr: "T\xFCrk\xE7e",
  el: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC",
  ko: "\uD55C\uAD6D\uC5B4",
  hi: "\u0939\u093F\u0928\u094D\u0926\u0940"
};
function normalizeNinaLang(lang) {
  const raw = (lang || "it").trim().toLowerCase().replace(/_/g, "-");
  if (!raw) return "it";
  if (raw === "zh" || raw.startsWith("zh-")) {
    if (raw.startsWith("zh-tw") || raw.startsWith("zh-hk") || raw.startsWith("zh-hant")) {
      return raw;
    }
    return "zh-cn";
  }
  if (NINA_REPLY_LANG_LABELS[raw]) return raw;
  const primary = raw.split("-")[0] || "it";
  return primary;
}
function ninaReplyLangLabel(lang) {
  const code = normalizeNinaLang(lang);
  return NINA_REPLY_LANG_LABELS[code] || NINA_REPLY_LANG_LABELS[code.split("-")[0]] || code;
}
function isNinaDefaultLang(lang) {
  return normalizeNinaLang(lang) === "it";
}
var SOFT_LOCK_IT = `Quella domanda entra nello **studio didattico degli Arcani Maggiori** (simbologia, senso, luce/ombra, chiave previsionale).

Qui in **accoglienza** ti oriento su prezzi, prenotazione WhatsApp, mappa del sito e Chi sono \u2014 senza le schede profonde del corso.

**Nina Studio** si sblocca con l\u2019acquisto del percorso **Arcani Maggiori** (stesso accesso dell\u2019Area Riservata e del blog riservato). Trovi il checkout su **Corsi \u2192 Arcani Maggiori**.

Per un consulto personale con Maria Teresa, usa **Parla con Maria Teresa** qui sotto.`;
var SOFT_LOCK_EN = `That question belongs in the **Maggiori study studio** (symbolism, meaning, light/shadow, predictive key).

Here in **welcome** I can help with prices, WhatsApp booking, the site map, and Chi sono \u2014 not the deep course sheets.

**Nina Studio** unlocks with the **Arcani Maggiori** course (same access as Area Riservata and the reserved blog). Checkout is on **Corsi \u2192 Arcani Maggiori**.

For a personal reading with Maria Teresa, use **Parla con Maria Teresa** below.`;
var SOFT_LOCK_ES = `Esa pregunta pertenece al **estudio did\xE1ctico de los Arcanos Mayores** (simbolog\xEDa, sentido, luz/sombra, clave previsional).

Aqu\xED en **acogida** te oriento sobre precios, reserva por WhatsApp, mapa del sitio y Chi sono \u2014 sin las fichas profundas del curso.

**Nina Studio** se desbloquea con la compra del recorrido **Arcani Maggiori** (mismo acceso que Area Riservata y el blog reservado). El checkout est\xE1 en **Corsi \u2192 Arcani Maggiori**.

Para una consulta personal con Maria Teresa, usa **Parla con Maria Teresa** abajo.`;
var SOFT_LOCK_FR = `Cette question rel\xE8ve de l\u2019**atelier didactique des Arcanes Majeurs** (symbolique, sens, lumi\xE8re/ombre, cl\xE9 pr\xE9visionnelle).

Ici en **accueil**, je t\u2019oriente sur les tarifs, la r\xE9servation WhatsApp, le plan du site et Chi sono \u2014 sans les fiches profondes du cours.

**Nina Studio** se d\xE9bloque avec l\u2019achat du parcours **Arcani Maggiori** (m\xEAme acc\xE8s qu\u2019Area Riservata et le blog r\xE9serv\xE9). Le checkout est sur **Corsi \u2192 Arcani Maggiori**.

Pour une consultation personnelle avec Maria Teresa, utilise **Parla con Maria Teresa** ci-dessous.`;
var SOFT_LOCK_DE = `Diese Frage geh\xF6rt in das **didaktische Studio der Gro\xDFen Arkana** (Symbolik, Sinn, Licht/Schatten, prognostischer Schl\xFCssel).

Hier in der **Willkommens-Chat** helfe ich bei Preisen, WhatsApp-Buchung, Sitemap und Chi sono \u2014 ohne die tiefen Kurskarten.

**Nina Studio** wird mit dem Kauf des Kurses **Arcani Maggiori** freigeschaltet (gleicher Zugang wie Area Riservata und der gesch\xFCtzte Blog). Checkout unter **Corsi \u2192 Arcani Maggiori**.

F\xFCr eine pers\xF6nliche Beratung mit Maria Teresa nutze unten **Parla con Maria Teresa**.`;
var SOFT_LOCK_PT = `Essa pergunta pertence ao **est\xFAdio did\xE1tico dos Arcanos Maiores** (simbologia, sentido, luz/sombra, chave previsional).

Aqui na **acolhida** oriento sobre pre\xE7os, reserva via WhatsApp, mapa do site e Chi sono \u2014 sem as fichas profundas do curso.

**Nina Studio** desbloqueia com a compra do percurso **Arcani Maggiori** (mesmo acesso da Area Riservata e do blog reservado). O checkout est\xE1 em **Corsi \u2192 Arcani Maggiori**.

Para uma consulta pessoal com Maria Teresa, use **Parla con Maria Teresa** abaixo.`;
var SOFT_LOCK_ZH = `\u8FD9\u4E2A\u95EE\u9898\u5C5E\u4E8E**\u5927\u963F\u5361\u7EB3\u5B66\u4E60\u5DE5\u4F5C\u5BA4**\uFF08\u8C61\u5F81\u3001\u610F\u4E49\u3001\u5149/\u5F71\u3001\u9884\u793A\u8981\u70B9\uFF09\u3002

\u5728**\u6B22\u8FCE**\u6A21\u5F0F\u91CC\uFF0C\u6211\u53EF\u4EE5\u5E2E\u4F60\u4E86\u89E3\u4EF7\u683C\u3001WhatsApp \u9884\u7EA6\u3001\u7F51\u7AD9\u5730\u56FE\u548C Chi sono\u2014\u2014\u4E0D\u5305\u62EC\u8BFE\u7A0B\u6DF1\u5904\u7684\u8BE6\u8868\u3002

**Nina Studio** \u9700\u8D2D\u4E70 **Arcani Maggiori** \u8BFE\u7A0B\u89E3\u9501\uFF08\u4E0E Area Riservata \u53CA\u4E13\u5C5E\u535A\u5BA2\u76F8\u540C\u6743\u9650\uFF09\u3002\u7ED3\u8D26\u5728 **Corsi \u2192 Arcani Maggiori**\u3002

\u82E5\u9700\u4E0E Maria Teresa \u4E00\u5BF9\u4E00\u54A8\u8BE2\uFF0C\u8BF7\u4F7F\u7528\u4E0B\u65B9\u7684 **Parla con Maria Teresa**\u3002`;
var SOFT_LOCK_JA = `\u305D\u306E\u8CEA\u554F\u306F**\u5927\u30A2\u30EB\u30AB\u30CA\u5B66\u7FD2\u30B9\u30BF\u30B8\u30AA**\uFF08\u8C61\u5FB4\u30FB\u610F\u5473\u30FB\u5149\u3068\u5F71\u30FB\u4E88\u5146\u306E\u9375\uFF09\u306E\u9818\u57DF\u3067\u3059\u3002

\u3053\u3053\u3067\u306F**\u30A6\u30A7\u30EB\u30AB\u30E0**\u3068\u3057\u3066\u3001\u6599\u91D1\u30FBWhatsApp\u4E88\u7D04\u30FB\u30B5\u30A4\u30C8\u30DE\u30C3\u30D7\u30FBChi sono \u3092\u3054\u6848\u5185\u3057\u307E\u3059\u3002\u30B3\u30FC\u30B9\u306E\u6DF1\u3044\u30B7\u30FC\u30C8\u306F\u542B\u307F\u307E\u305B\u3093\u3002

**Nina Studio** \u306F **Arcani Maggiori** \u30B3\u30FC\u30B9\u8CFC\u5165\u3067\u89E3\u9664\u3055\u308C\u307E\u3059\uFF08Area Riservata / \u9650\u5B9A\u30D6\u30ED\u30B0\u3068\u540C\u3058\u30A2\u30AF\u30BB\u30B9\uFF09\u3002\u30C1\u30A7\u30C3\u30AF\u30A2\u30A6\u30C8\u306F **Corsi \u2192 Arcani Maggiori**\u3002

Maria Teresa \u3068\u306E\u500B\u4EBA\u9451\u5B9A\u306F\u3001\u4E0B\u306E **Parla con Maria Teresa** \u3092\u3054\u5229\u7528\u304F\u3060\u3055\u3044\u3002`;
var SOFT_LOCK_AR = `\u0647\u0630\u0627 \u0627\u0644\u0633\u0624\u0627\u0644 \u064A\u0646\u062A\u0645\u064A \u0625\u0644\u0649 **\u0627\u0633\u062A\u0648\u062F\u064A\u0648 \u062F\u0631\u0627\u0633\u0629 \u0627\u0644\u0623\u0631\u0643\u0627\u0646\u0627 \u0627\u0644\u0643\u0628\u0631\u0649** (\u0627\u0644\u0631\u0645\u0632\u064A\u0629\u060C \u0627\u0644\u0645\u0639\u0646\u0649\u060C \u0627\u0644\u0646\u0648\u0631/\u0627\u0644\u0638\u0644\u060C \u0627\u0644\u0645\u0641\u062A\u0627\u062D \u0627\u0644\u062A\u0646\u0628\u0624\u064A).

\u0647\u0646\u0627 \u0641\u064A **\u0627\u0644\u062A\u0631\u062D\u064A\u0628** \u0623\u0631\u0634\u062F\u0643 \u0628\u062E\u0635\u0648\u0635 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0648\u062D\u062C\u0632 \u0648\u0627\u062A\u0633\u0627\u0628 \u0648\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0645\u0648\u0642\u0639 \u0648Chi sono \u2014 \u062F\u0648\u0646 \u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0639\u0645\u064A\u0642\u0629.

\u064A\u064F\u0641\u062A\u062D **Nina Studio** \u0628\u0634\u0631\u0627\u0621 \u0645\u0633\u0627\u0631 **Arcani Maggiori** (\u0646\u0641\u0633 \u0648\u0635\u0648\u0644 Area Riservata \u0648\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0645\u062D\u062C\u0648\u0632\u0629). \u0627\u0644\u062F\u0641\u0639 \u0639\u0628\u0631 **Corsi \u2192 Arcani Maggiori**.

\u0644\u0627\u0633\u062A\u0634\u0627\u0631\u0629 \u0634\u062E\u0635\u064A\u0629 \u0645\u0639 Maria Teresa\u060C \u0627\u0633\u062A\u062E\u062F\u0645\u064A **Parla con Maria Teresa** \u0623\u062F\u0646\u0627\u0647.`;
var SOFT_LOCK_RU = `\u042D\u0442\u043E\u0442 \u0432\u043E\u043F\u0440\u043E\u0441 \u043E\u0442\u043D\u043E\u0441\u0438\u0442\u0441\u044F \u043A **\u0443\u0447\u0435\u0431\u043D\u043E\u0439 \u0441\u0442\u0443\u0434\u0438\u0438 \u0421\u0442\u0430\u0440\u0448\u0438\u0445 \u0410\u0440\u043A\u0430\u043D\u043E\u0432** (\u0441\u0438\u043C\u0432\u043E\u043B\u0438\u043A\u0430, \u0441\u043C\u044B\u0441\u043B, \u0441\u0432\u0435\u0442/\u0442\u0435\u043D\u044C, \u043F\u0440\u043E\u0433\u043D\u043E\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043A\u043B\u044E\u0447).

\u0412 \u0440\u0435\u0436\u0438\u043C\u0435 **\u043F\u0440\u0438\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u044F** \u044F \u043F\u043E\u043C\u043E\u0433\u0430\u044E \u0441 \u0446\u0435\u043D\u0430\u043C\u0438, \u0437\u0430\u043F\u0438\u0441\u044C\u044E \u0447\u0435\u0440\u0435\u0437 WhatsApp, \u043A\u0430\u0440\u0442\u043E\u0439 \u0441\u0430\u0439\u0442\u0430 \u0438 Chi sono \u2014 \u0431\u0435\u0437 \u0433\u043B\u0443\u0431\u043E\u043A\u0438\u0445 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u043A\u0443\u0440\u0441\u0430.

**Nina Studio** \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u043F\u043E\u043A\u0443\u043F\u043A\u0438 \u043A\u0443\u0440\u0441\u0430 **Arcani Maggiori** (\u0442\u043E\u0442 \u0436\u0435 \u0434\u043E\u0441\u0442\u0443\u043F, \u0447\u0442\u043E Area Riservata \u0438 \u0437\u0430\u043A\u0440\u044B\u0442\u044B\u0439 \u0431\u043B\u043E\u0433). \u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435: **Corsi \u2192 Arcani Maggiori**.

\u0414\u043B\u044F \u043B\u0438\u0447\u043D\u043E\u0439 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u0438 \u0441 Maria Teresa \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 **Parla con Maria Teresa** \u043D\u0438\u0436\u0435.`;
var SOFT_LOCK_KO = `\uADF8 \uC9C8\uBB38\uC740 **\uBA54\uC774\uC800 \uC544\uB974\uCE74\uB098 \uD559\uC2B5 \uC2A4\uD29C\uB514\uC624**(\uC0C1\uC9D5, \uC758\uBBF8, \uBE5B/\uADF8\uB9BC\uC790, \uC608\uC9C0 \uD0A4)\uC5D0 \uD574\uB2F9\uD569\uB2C8\uB2E4.

\uC5EC\uAE30 **\uD658\uC601** \uBAA8\uB4DC\uC5D0\uC11C\uB294 \uAC00\uACA9, WhatsApp \uC608\uC57D, \uC0AC\uC774\uD2B8\uB9F5, Chi sono\uB97C \uC548\uB0B4\uD569\uB2C8\uB2E4. \uCF54\uC2A4\uC758 \uAE4A\uC740 \uC2DC\uD2B8\uB294 \uD3EC\uD568\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.

**Nina Studio**\uB294 **Arcani Maggiori** \uCF54\uC2A4 \uAD6C\uB9E4\uB85C \uC7A0\uAE08 \uD574\uC81C\uB429\uB2C8\uB2E4(Area Riservata / \uC804\uC6A9 \uBE14\uB85C\uADF8\uC640 \uB3D9\uC77C \uC811\uADFC). \uACB0\uC81C\uB294 **Corsi \u2192 Arcani Maggiori**.

Maria Teresa\uC640 \uAC1C\uC778 \uC0C1\uB2F4\uC740 \uC544\uB798 **Parla con Maria Teresa**\uB97C \uC774\uC6A9\uD574 \uC8FC\uC138\uC694.`;
var SOFT_LOCK_BY_LANG = {
  it: SOFT_LOCK_IT,
  en: SOFT_LOCK_EN,
  es: SOFT_LOCK_ES,
  fr: SOFT_LOCK_FR,
  de: SOFT_LOCK_DE,
  pt: SOFT_LOCK_PT,
  "zh-cn": SOFT_LOCK_ZH,
  zh: SOFT_LOCK_ZH,
  ja: SOFT_LOCK_JA,
  ar: SOFT_LOCK_AR,
  ru: SOFT_LOCK_RU,
  ko: SOFT_LOCK_KO
};
function ninaStudioSoftLockReply(lang) {
  const code = normalizeNinaLang(lang);
  return SOFT_LOCK_BY_LANG[code] || SOFT_LOCK_BY_LANG[code.split("-")[0]] || SOFT_LOCK_EN;
}
var GATE_IT = {
  studioAuth: "Per Nina Studio accedi con Google (stesso account dell\u2019Area Riservata).",
  studioLocked: "Nina Studio si sblocca con l\u2019acquisto del corso Arcani Maggiori (stesso accesso dell\u2019Area Riservata). Trovi il checkout su Corsi.",
  studioLockedDemo: "Nina Studio \xE8 riservata a chi ha acquistato Arcani Maggiori. Apri Corsi per il checkout.",
  studioEntitlement: "Non riesco a verificare l\u2019accesso a Nina Studio in questo momento. Riprova tra poco oppure apri l\u2019Area Riservata."
};
var GATE_EN = {
  studioAuth: "To use Nina Studio, sign in with Google (same account as Area Riservata).",
  studioLocked: "Nina Studio unlocks with the Arcani Maggiori course (same access as Area Riservata). Checkout is on Corsi.",
  studioLockedDemo: "Nina Studio is for Arcani Maggiori students. Open Corsi for checkout.",
  studioEntitlement: "I cannot verify Nina Studio access right now. Try again shortly or open Area Riservata."
};
var GATE_ES = {
  studioAuth: "Para Nina Studio, inicia sesi\xF3n con Google (la misma cuenta de Area Riservata).",
  studioLocked: "Nina Studio se desbloquea con el curso Arcani Maggiori (mismo acceso que Area Riservata). El checkout est\xE1 en Corsi.",
  studioLockedDemo: "Nina Studio es para quien ha comprado Arcani Maggiori. Abre Corsi para el checkout.",
  studioEntitlement: "No puedo verificar el acceso a Nina Studio ahora. Prueba de nuevo o abre Area Riservata."
};
var GATE_FR = {
  studioAuth: "Pour Nina Studio, connecte-toi avec Google (le m\xEAme compte qu\u2019Area Riservata).",
  studioLocked: "Nina Studio se d\xE9bloque avec le cours Arcani Maggiori (m\xEAme acc\xE8s qu\u2019Area Riservata). Checkout sur Corsi.",
  studioLockedDemo: "Nina Studio est r\xE9serv\xE9e \xE0 qui a achet\xE9 Arcani Maggiori. Ouvre Corsi pour le checkout.",
  studioEntitlement: "Je ne peux pas v\xE9rifier l\u2019acc\xE8s \xE0 Nina Studio pour le moment. R\xE9essaie bient\xF4t ou ouvre Area Riservata."
};
var GATE_DE = {
  studioAuth: "F\xFCr Nina Studio bitte mit Google anmelden (dasselbe Konto wie Area Riservata).",
  studioLocked: "Nina Studio wird mit dem Kurs Arcani Maggiori freigeschaltet (gleicher Zugang wie Area Riservata). Checkout unter Corsi.",
  studioLockedDemo: "Nina Studio ist f\xFCr K\xE4ufer von Arcani Maggiori. \xD6ffne Corsi f\xFCr den Checkout.",
  studioEntitlement: "Ich kann den Zugang zu Nina Studio gerade nicht pr\xFCfen. Bitte sp\xE4ter erneut versuchen oder Area Riservata \xF6ffnen."
};
var GATE_PT = {
  studioAuth: "Para Nina Studio, entra com Google (a mesma conta da Area Riservata).",
  studioLocked: "Nina Studio desbloqueia com o curso Arcani Maggiori (mesmo acesso da Area Riservata). Checkout em Corsi.",
  studioLockedDemo: "Nina Studio \xE9 para quem comprou Arcani Maggiori. Abre Corsi para o checkout.",
  studioEntitlement: "N\xE3o consigo verificar o acesso a Nina Studio agora. Tenta de novo ou abre a Area Riservata."
};
var GATE_ZH = {
  studioAuth: "\u4F7F\u7528 Nina Studio \u8BF7\u7528 Google \u767B\u5F55\uFF08\u4E0E Area Riservata \u540C\u4E00\u8D26\u53F7\uFF09\u3002",
  studioLocked: "Nina Studio \u9700\u8D2D\u4E70 Arcani Maggiori \u8BFE\u7A0B\u89E3\u9501\uFF08\u4E0E Area Riservata \u76F8\u540C\u6743\u9650\uFF09\u3002\u7ED3\u8D26\u5728 Corsi\u3002",
  studioLockedDemo: "Nina Studio \u4EC5\u9650\u5DF2\u8D2D\u4E70 Arcani Maggiori \u7684\u7528\u6237\u3002\u8BF7\u6253\u5F00 Corsi \u7ED3\u8D26\u3002",
  studioEntitlement: "\u6682\u65F6\u65E0\u6CD5\u9A8C\u8BC1 Nina Studio \u8BBF\u95EE\u6743\u9650\u3002\u8BF7\u7A0D\u540E\u91CD\u8BD5\u6216\u6253\u5F00 Area Riservata\u3002"
};
var GATE_JA = {
  studioAuth: "Nina Studio \u3092\u4F7F\u3046\u306B\u306F Google \u3067\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044\uFF08Area Riservata \u3068\u540C\u3058\u30A2\u30AB\u30A6\u30F3\u30C8\uFF09\u3002",
  studioLocked: "Nina Studio \u306F Arcani Maggiori \u30B3\u30FC\u30B9\u8CFC\u5165\u3067\u89E3\u9664\u3055\u308C\u307E\u3059\uFF08Area Riservata \u3068\u540C\u3058\u30A2\u30AF\u30BB\u30B9\uFF09\u3002\u30C1\u30A7\u30C3\u30AF\u30A2\u30A6\u30C8\u306F Corsi\u3002",
  studioLockedDemo: "Nina Studio \u306F Arcani Maggiori \u8CFC\u5165\u8005\u5411\u3051\u3067\u3059\u3002Corsi \u3067\u30C1\u30A7\u30C3\u30AF\u30A2\u30A6\u30C8\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  studioEntitlement: "\u3044\u307E Nina Studio \u306E\u30A2\u30AF\u30BB\u30B9\u3092\u78BA\u8A8D\u3067\u304D\u307E\u305B\u3093\u3002\u3057\u3070\u3089\u304F\u3057\u3066\u304B\u3089\u518D\u8A66\u884C\u3059\u308B\u304B\u3001Area Riservata \u3092\u958B\u3044\u3066\u304F\u3060\u3055\u3044\u3002"
};
var GATE_BY_LANG = {
  it: GATE_IT,
  en: GATE_EN,
  es: GATE_ES,
  fr: GATE_FR,
  de: GATE_DE,
  pt: GATE_PT,
  "zh-cn": GATE_ZH,
  zh: GATE_ZH,
  ja: GATE_JA
};
function ninaStudioGateCopy(lang) {
  const code = normalizeNinaLang(lang);
  return GATE_BY_LANG[code] || GATE_BY_LANG[code.split("-")[0]] || GATE_EN;
}

// src/lib/ninaChatKnowledge.ts
var NINA_CHAT_SITE_KNOWLEDGE = `Conoscenza ufficiale del sito (fonte: copy pubblico Tarot Italia \u2014 usa SOLO questi fatti; stile FAQ breve e caldo; per prezzi e FAQ cita le risposte qui sotto, senza inventare):

## Consulti \u2014 introduzione ufficiale
Quattro durate calibrate per profondit\xE0 differenti. In ogni sessione leggo Arcani Maggiori e Minori: online in chiamata vocale riservata, oppure di persona a Macerata (Via Crispi 37) su appuntamento \u2014 il Consulto Breve \xE8 solo online.

Accoglienza: Che tu arrivi con una domanda immediata e sincera \u2014 anche semplice o legata agli affetti, come \xABMi pensa?\xBB \u2014 o con il bisogno di fare chiarezza su un passaggio complesso, i miei consulti nascono per trasformare il caos in cosmos. Integro la lettura viva della cartomanzia pura con la tarologia evolutiva attraverso tutti i 78 Arcani, Maggiori e Minori.

Non \xE8 richiesta alcuna conoscenza preliminare delle carte: ti guido passo dopo passo tra archetipi, motivazioni e chiavi di lettura pratiche perch\xE9 tu possa uscire con una visione rinnovata e riprendere in mano le redini del tuo percorso. I consulti online si svolgono esclusivamente in modalit\xE0 chiamata vocale, per favorire ascolto profondo e concentrazione.

Etica consulti: ogni consulto offre una lettura chiara del presente e delle tendenze future nel rispetto del libero arbitrio. Nessuna promessa miracolistica o sostituzione di pareri medici e legali.

## Tariffe consulti (prezzi correnti, EUR)
In **ogni** sessione Maria Teresa legge **Arcani Maggiori e Minori**.

- **Consulto Breve** \xB7 20 min \xB7 **\u20AC19** \xB7 **solo online** (chiamata vocale) \xB7 Solo online \xB7 Domanda rapida
  Venti minuti solo online per una domanda chiara e un orientamento rapido, con lettura di Arcani Maggiori e Minori.
  Include: 20 minuti di dialogo individuale solo online (chiamata vocale); Lettura con Arcani Maggiori e Minori su un tema puntuale; Indicazioni pratiche via email o WhatsApp.

- **Consulto Essenziale** \xB7 45 min \xB7 **\u20AC50** \xB7 online o di persona \xB7 Pi\xF9 domande \xB7 Chiarezza immediata
  Un incontro mirato per approfondire pi\xF9 domande sul presente, con chiarezza simbolica ed equilibrio.
  Include: 45 minuti di dialogo individuale (online o di persona); Lettura con Arcani Maggiori e Minori su pi\xF9 domande; Sintesi scritta dei punti emersi via email o WhatsApp.

- **Consulto Evolutivo Completo** \xB7 60 min \xB7 **\u20AC75** \xB7 online o di persona a Macerata \xB7 Consigliato \xB7 Analisi approfondita (percorso consigliato)
  Il percorso consigliato per esplorare radici, risorse interiori e possibili direzioni di trasformazione consapevole.
  Include: 60 minuti di sessione individuale in chiamata vocale o di persona a Macerata; Lettura combinata di Arcani Maggiori e Minori; Mappa delle domande maieutiche per le settimane successive.

- **Sessione Integrata** \xB7 90 min \xB7 **\u20AC90** \xB7 online o di persona a Macerata \xB7 Ciclo annuale \xB7 Massima profondit\xE0
  Incontro esteso dedicato a momenti di svolta, bilanci di ciclo annuale o lavoro articolato su pi\xF9 ambiti di vita.
  Include: 90 minuti di dialogo olistico in chiamata vocale o di persona a Macerata; Lettura completa con Arcani Maggiori e Minori (dodici case o doppio confronto); Follow-up scritto entro 48 ore tramite canale riservato.

## Modalit\xE0, orari e sedute (Europe/Rome)
- Slot pubblici tipici: dalle 09:00 alle 20:00.
- Online = chiamata vocale riservata (WhatsApp).
- Di persona: Via Crispi 37, 62100 Macerata, su appuntamento \u2014 disponibili fino alle 18:00; **dalle 19:00 solo online**.
- Il **Consulto Breve** non \xE8 disponibile di persona (solo online).

## Prenotazione e pagamento (copy Prenota)
Scegli durata, giorno e orario: in ogni sessione Maria Teresa legge Arcani Maggiori e Minori. Poi inviaci la richiesta su WhatsApp e riceverai le indicazioni per il pagamento. Il Consulto Breve \xE8 solo online.

Per ora il pagamento online \xE8 in pausa. Invia la prenotazione su WhatsApp: riceverai da Maria Teresa le modalit\xE0 di pagamento e la conferma dello slot.

- Contatti pubblici: WhatsApp / Telegram / telefono 379 103 82 53 \xB7 email info@tarotitalia.com.
- Non promettere checkout Stripe attivo: il pagamento online \xE8 in pausa.

## Corsi / didattica (copy ufficiale pagina Corsi)
Pagina Corsi attiva: tre percorsi acquistabili singolarmente \u2014 Arcani Maggiori (\u20AC 190), Arcani Minori (\u20AC 210), Metodi di Stesura (\u20AC 240).
Catalogo, programma e form iscrizione sono disponibili su /corsi. I materiali didattici dettagliati possono ancora essere in distribuzione progressiva (\xABDidattica in arrivo\xBB sulle card).
Non inventare date di partenza o promozioni non presenti sul sito; per prezzi e iscrizione rinvia alla pagina Corsi o a \xABParla con Maria Teresa\xBB.

## FAQ Home \u2014 Domande Frequenti su Approccio ed Etica
(Rispondi fedelmente a queste Q&A quando pertinenti.)

D1. In che modo i Tarocchi di Tarot Italia leggono il presente e prevedono il futuro?
R1. Nel metodo di Tarot Italia gli Arcani illuminano le dinamiche attuali e tracciano le linee previsionali degli sviluppi futuri. La lettura previsionale individua scenari, opportunit\xE0 e snodi in arrivo rispettando sempre il tuo libero arbitrio, cos\xEC da permetterti scelte lucide e consapevoli.

D2. Qual \xE8 l\u2019ambito di un Operatore Olistico ai sensi della Legge 4/2013?
R2. Maria Teresa Rogani opera come Operatore Olistico disciplinato ai sensi della Legge 4/2013 sulle professioni non organizzate. La consulenza offre ascolto empatico, lettura simbolica e previsionale e stimoli di consapevolezza interiore, senza mai sostituirsi a medici, psicoterapeuti, psichiatri o consulenti legali.

D3. Quali richieste sono escluse per etica professionale?
R3. Non vengono formulate diagnosi o indicazioni sanitarie, pronostici su patologie o decessi, n\xE9 consulenze legali o finanziarie vincolanti. Sono inoltre categoricamente esclusi rituali magici, legamenti o promesse di risultati garantiti.

D4. Come prepararsi a un consulto da 20, 45, 60 o 90 minuti?
R4. \xC8 sufficiente portare una o pi\xF9 domande chiare sul tuo percorso presente o sugli sviluppi futuri \u2014 in ambito professionale, creativo o relazionale. I consulti online avvengono esclusivamente in chiamata vocale riservata: dopo la prenotazione riceverai tutte le indicazioni per collegarti oppure l\u2019indirizzo di Via Crispi 37 a Macerata per l\u2019incontro di persona.

D5. I temi condivisi durante l\u2019incontro restano confidenziali?
R5. S\xEC. Ogni dialogo si svolge nel rispetto della massima riservatezza professionale: le sessioni non vengono registrate n\xE9 condivise con terzi e i dati di prenotazione sono trattati esclusivamente per gestire l\u2019appuntamento.

## FAQ Consulti \u2014 Domande sul Metodo e sullo Svolgimento del Consulto
(Rispondi fedelmente a queste Q&A quando pertinenti.)

D1. Che differenza c\u2019\xE8 tra la cartomanzia tradizionale e il mio metodo?
R1. La cartomanzia tradizionale cerca spesso risposte meccaniche e a tenuta stagna (s\xEC, no, quando). Il mio approccio \xE8 un ibrido che integra sia la cartomanzia pura che la tarologia evolutiva: utilizzo i 78 Arcani (tra Maggiori e Minori) non per inchiodarti a un futuro immobile, ma per trasformare il caos in cosmos, dando alla stesa una piega molto pi\xF9 riflessiva e profonda rispetto all\u2019immediatezza di una risposta statica.

D2. Ha senso fare una domanda semplice o legata agli affetti, come \xABMi pensa?\xBB
R2. Assolutamente s\xEC. Spesso si parte da un interrogativo immediato o impulsivo tipico della cartomanzia per scavare in profondit\xE0. Da una domanda sugli affetti inizio a tracciare dinamiche, motivazioni e chiavi di lettura per nulla banali, restituendo alla situazione una prospettiva riflessiva e la sua reale complessit\xE0.

D3. Qual \xE8 il ruolo dei 78 Arcani durante una sessione?
R3. I 78 Arcani \u2014 comprensivi sia di Arcani Maggiori che di Minori \u2014 agiscono come icone, archetipi e specchi della tua interiorit\xE0. Non sono entit\xE0 che decidono per te, ma messaggeri e narratori che ti accompagnano nell\u2019esplorazione della tua narrazione pi\xF9 autentica, in uno spazio sicuro e privo di giudizio.

D4. Cosa devo aspettarmi alla fine di una consulenza?
R4. Di uscire con una visione rinnovata. Pi\xF9 che risposte preconfezionate, riceverai tracce, chiavi di lettura e consapevolezze pratiche per rimettere ordine nel tuo vissuto e riprendere in mano le redini del tuo percorso con maggiore chiarezza.

D5. Come si svolge la lettura, e mi serve una conoscenza preliminare?
R5. Non \xE8 richiesta alcuna conoscenza preliminare della simbologia o del linguaggio degli arcani. Lavoro integrando la lettura viva della cartomanzia con un percorso di riflessione profonda: ti accolgo esattamente dove ti trovi, guidandoti passo dopo passo attraverso le immagini per decifrare la tua storia. I consulti online avvengono esclusivamente in modalit\xE0 chiamata vocale.

## Dialogo Tarot
Spazio interattivo sul sito con i 22 Arcani Maggiori (riflessione guidata). Non sostituisce un consulto umano con Maria Teresa. Non mescolare i testi del Dialogo Tarot con le schede didattiche Maggiori: sono percorsi distinti. Dialogo Tarot \u2260 Nina Studio \u2260 chat di accoglienza.

## Mappa del sito (orientamento)
- **Home** \u2014 panoramica, consulti, didattica
- **Chi sono** \u2014 percorso di Maria Teresa Rogani
- **Consulti** \u2014 tariffe e modalit\xE0
- **Dialogo Tarot** \u2014 percorso interattivo 22 Maggiori (separato da Nina)
- **Corsi** \u2014 Maggiori (\u20AC190), Minori (\u20AC210), Metodi di Stesura (\u20AC240); checkout Maggiori su /corsi
- **Blog / News** \u2014 articoli (alcuni approfondimenti Maggiori riservati ai corsisti)
- **Contatti** \u2014 email, telefono, mappa Macerata
- **Prenota** \u2014 richiesta appuntamento via WhatsApp (Stripe in pausa per i consulti)
- **Area Riservata** \u2014 dispense e percorsi dopo acquisto / accesso Google

## Chi sono (sintesi leggera)
Maria Teresa Rogani \xB7 Operatore Olistico (L. 4/2013). Formazione in comunicazione visiva / Accademia di Belle Arti; sguardo su composizione, colore e simboli nel contesto storico e iconografico. Integra tarologia esoterica, tradizione Rider-Waite-Smith e pratiche olistiche di ascolto. Per il racconto completo: pagina **Chi sono**.

## CTA
- Quando serve un consulto autentico, una prenotazione o un dubbio personale, invita a **Parla con Maria Teresa** (sezione fissa sotto la chat: Prenota, WhatsApp, Telegram, email).
- Non aggiungere blocchi CTA markdown n\xE9 elenchi di bottoni nel messaggio.`;
var NINA_MAGGIORI_CARDS = NINA_MAGGIORI_CARDS_GENERATED;
var NINA_CHAT_MAGGIORI_FRAME = `## Arcani Maggiori \u2014 schede didattiche ufficiali (Trionfi 0\u2013XXI)

Fonte: dispensa Area Personale Tarot Italia + schede visive Waite-Smith (0\u2013VII) + approfondimenti Terzo Settenario dove presenti. Usa SOLO le schede iniettate sotto (se presenti). Non inventare iconografia Waite assente. Non mescolare con Dialogo Tarot.

Struttura risposta (quando chiedono un Arcano Maggiore \u2014 aspetto visivo, simbologia, significato, luce/ombra, previsione):
1. **Simbologia** (+ cues Waite se in scheda)
2. **Significato / senso**
3. **Luce / ombra** o **Pratica corso** \u2014 solo se presenti; altrimenti non inventarli
4. **In chiave previsionale**
Tono: caldo, rigoroso, Tarot Italia. Per approfondimenti: **Parla con Maria Teresa** / corso Maggiori.

Architettura: 22 lame (0\u2013XXI). Primo (0\u2013VII) identit\xE0; Secondo (VIII\u2013XIV) prova etica; Terzo (XV\u2013XXI) Ombra e compiutezza.
Elenco: 0 Matto \xB7 I Bagatto \xB7 II Papessa \xB7 III Imperatrice \xB7 IV Imperatore \xB7 V Papa \xB7 VI Amanti \xB7 VII Carro \xB7 VIII Giustizia \xB7 IX Eremita \xB7 X Ruota \xB7 XI Forza \xB7 XII Appeso \xB7 XIII Morte \xB7 XIV Temperanza \xB7 XV Diavolo \xB7 XVI Torre \xB7 XVII Stelle \xB7 XVIII Luna \xB7 XIX Sole \xB7 XX Giudizio \xB7 XXI Mondo.
Se manca la scheda dettagliata nel contesto, chiedi quale Trionfo (0\u2013XXI) e non inventare dettagli Waite.`;
var MAX_INJECTED_CARDS = 3;
var NINA_STUDIO_SOFT_LOCK_REPLY = ninaStudioSoftLockReply("it");
function normalizeForMatch(text2) {
  return text2.toLowerCase().normalize("NFD").replace(new RegExp("\\p{M}", "gu"), "");
}
var DEEP_STUDY_CUES = /\b(simbolog\w*|iconograf\w*|waite|smith|luce\s*\/?\s*ombra|ombra|prevision\w*|senso\s+profond|significat\w*|scheda\s+visiv|trionf\w*|arcano\s+maggior|maggiori\s+didatt)/;
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function selectMaggioriCardsForText(text2) {
  const hay = normalizeForMatch(text2);
  if (!hay.trim()) return [];
  const matched = [];
  for (const card of NINA_MAGGIORI_CARDS) {
    const hit = card.aliases.some((alias) => {
      const needle = normalizeForMatch(alias);
      if (!needle) return false;
      if (needle.includes(" ")) return hay.includes(needle);
      return new RegExp(
        `(?:^|[^a-z0-9])${escapeRegExp(needle)}(?:[^a-z0-9]|$)`
      ).test(hay);
    });
    const romanCue = new RegExp(
      `(?:^|[^a-z0-9])(?:arcano|trionfo|lama|lame|carta)\\s*(?:n[\xB0o.]?\\s*)?(?:${escapeRegExp(card.roman.toLowerCase())}|${card.id})(?:[^a-z0-9]|$)`
    );
    if (hit || romanCue.test(hay)) {
      matched.push(card);
    }
    if (matched.length >= MAX_INJECTED_CARDS) break;
  }
  return matched;
}
function formatMaggioriKnowledgeForCards(cards) {
  if (cards.length === 0) {
    return `${NINA_CHAT_MAGGIORI_FRAME}

(Nessuna scheda Trionfo iniettata in questo turno: se chiedono un Arcano specifico, rispondi in sintesi dall\u2019elenco e invita a nominare il Trionfo, oppure usa solo quanto gi\xE0 detto in chat senza inventare Waite.)`;
  }
  return `${NINA_CHAT_MAGGIORI_FRAME}

### Schede iniettate per questa conversazione
${cards.map((c) => c.body).join("\n\n")}`;
}
function buildMaggioriKnowledgeForMessages(params) {
  const parts = [params.message];
  const history = params.history ?? [];
  for (const turn of history.slice(-6)) {
    if (typeof turn.content === "string" && turn.content.trim()) {
      parts.push(turn.content);
    }
  }
  const cards = selectMaggioriCardsForText(parts.join("\n"));
  return formatMaggioriKnowledgeForCards(cards);
}
function looksLikeDeepMaggioriStudy(params) {
  const parts = [params.message];
  for (const turn of (params.history ?? []).slice(-4)) {
    if (typeof turn.content === "string" && turn.content.trim()) {
      parts.push(turn.content);
    }
  }
  const hay = normalizeForMatch(parts.join("\n"));
  if (!hay.trim()) return false;
  const named = selectMaggioriCardsForText(hay).length > 0;
  const deepCue = DEEP_STUDY_CUES.test(hay);
  return named || deepCue;
}
function buildAllMaggioriKnowledge() {
  return formatMaggioriKnowledgeForCards(NINA_MAGGIORI_CARDS);
}
var NINA_CHAT_MAGGIORI_KNOWLEDGE = buildAllMaggioriKnowledge();

// src/lib/groqChat.ts
var GROQ_CHAT_ENV_KEY = "TAROTITALIACHATGENERICAGROQ_API_KEY";
var GROQ_CHAT_DEFAULT_MODEL = "openai/gpt-oss-20b";
var GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
var NINA_WELCOME_PERSONA = `Sei Nina, l\u2019assistente virtuale di **accoglienza** di Tarot Italia (tarotitalia.com) \u2014 chat pubblica e gratuita.

Questa modalit\xE0 si chiama **Nina \xB7 Accoglienza** (non \xABNina Studio\xBB).

Tono e stile:
- Empatico, caldo, chiaro, FAQ breve; una idea per paragrafo.
- Ti presenti come Nina (accoglienza del sito), non come Maria Teresa in carne e ossa.

Cosa puoi fare (solo questo):
- Prezzi consulti ufficiali **\u20AC19 / \u20AC50 / \u20AC75 / \u20AC90**; Breve **solo online**; Maggiori e Minori in ogni sessione.
- Modalit\xE0 di pagamento consulti: **WhatsApp** (Stripe in pausa per i consulti) \u2014 non promettere checkout Stripe attivo.
- Mappa del sito e orientamento alle pagine pubbliche.
- Sintesi leggera di **Chi sono** (formazione / Operatore Olistico L. 4/2013) \u2014 senza biografia inventata.
- FAQ pubbliche (etica, preparazione, riservatezza) dalla conoscenza ufficiale.
- Guidare a Prenota / Parla con Maria Teresa.

Limiti (obbligatori) \u2014 Nina Studio \xE8 un altro prodotto:
- **NON** insegnare simbologia Waite-Smith, senso profondo, luce/ombra o chiave previsionale dei Trionfi.
- **NON** iniettare n\xE9 citare schede didattiche Maggiori del corso.
- Se chiedono approfondimento Maggiori (es. \xABcom\u2019\xE8 visivamente il Matto\xBB, simbologia, luce/ombra, previsione di un Arcano): rispondi con un soft-lock caldo \u2014 spiega che serve **Nina Studio**, sbloccata con l\u2019acquisto del corso **Arcani Maggiori** (stesso accesso Area Riservata / blog riservato), e invita a **Corsi \u2192 checkout Maggiori** (/corsi). Non inventare schede.
- Non mescolare Dialogo Tarot (percorso interattivo a pagamento/riflessione) con questa chat n\xE9 con Nina Studio.
- Non sostituisci pareri medici, psicologici, legali o finanziari.
- Non inventare prezzi, promozioni, date corsi o orari oltre la conoscenza ufficiale.
- Risposte concise; etica ferma contro violenza, abusi, contenuti illeciti.

Formato messaggio (obbligatorio \u2014 mobile-friendly):
- Paragrafi brevi (1\u20133 frasi), riga vuota tra paragrafi. **Grassetto** con moderazione. Niente HTML.
- Quando inviti al contatto, rimanda a **Parla con Maria Teresa** sotto la chat (niente elenchi di bottoni nel messaggio).`;
var NINA_STUDIO_PERSONA = `Sei **Nina Studio**, la compagnia di studio degli Arcani Maggiori di Tarot Italia \u2014 riservata a chi ha acquistato il corso **Arcani Maggiori**.

Questa modalit\xE0 \xE8 distinta dalla chat di accoglienza pubblica e dal **Dialogo Tarot** (percorso interattivo separato).

Tono e stile:
- Empatico, caldo, rigoroso, didattico; sensibilit\xE0 simbolica + chiarezza pratica.
- Ti presenti come Nina Studio (studio Maggiori), non come Maria Teresa in carne e ossa.

Cosa puoi fare:
- Accompagnare lo studio dei Trionfi 0\u2013XXI con la sintassi didattica ufficiale: **Simbologia \u2192 Significato/senso \u2192 Luce/ombra (se in scheda) \u2192 In chiave previsionale**.
- Usare **solo** le schede Maggiori iniettate per questo turno (on-demand). Per iconografia Waite-Smith cita solo i cues gi\xE0 nelle schede. Non inventare simboli, colori o attributi.
- Orientare anche su FAQ/prezzi del sito se chiesto, dalla conoscenza ufficiale.
- Per consulto personale: invita a **Parla con Maria Teresa**.

Limiti (obbligatori):
- Non inventare iconografia assente dalle schede; se manca un dettaglio, dillo e invita al materiale del corso / Parla con Maria Teresa.
- Non mescolare i testi del Dialogo Tarot con le schede didattiche Maggiori.
- Non sostituisci pareri medici, psicologici, legali o finanziari.
- Non inventare prezzi o promozioni oltre la conoscenza ufficiale.
- Etica ferma: rifiuta violenza, abusi, contenuti illeciti.

Formato messaggio (obbligatorio \u2014 mobile-friendly):
- Paragrafi brevi; per Maggiori puoi usare i quattro campi didattici in forma breve.
- **Grassetto** con moderazione. Niente HTML. CTA contatto \u2192 sezione **Parla con Maria Teresa** sotto la chat.`;
function ninaReplyLanguageSuffix(lang) {
  if (isNinaDefaultLang(lang)) return "";
  const code = normalizeNinaLang(lang);
  const label = ninaReplyLangLabel(code);
  return `

## Lingua di risposta (ENN-143 \xB7 Google Translate)
L\u2019utente sta navigando il sito nella lingua di Google Traduttore: **${label}** (\`${code}\`).
Rispondi SEMPRE in ${label}. La conoscenza ufficiale sopra resta in italiano come fonte (prezzi, FAQ, Maggiori): traducila fedelmente nella risposta senza inventare e senza riscrivere/ripetere l\u2019intero blocco conoscenza in un\u2019altra lingua nel system prompt.
I nomi \xABTarot Italia\xBB, \xABMaria Teresa Rogani\xBB, \xABNina\xBB, \xABNina Studio\xBB, \xABArcani Maggiori\xBB, \xABDialogo Tarot\xBB e i prezzi in EUR restano invariati.`;
}
function buildNinaSystemPrompt(params) {
  const mode = params.mode === "studio" ? "studio" : "welcome";
  const persona = mode === "studio" ? NINA_STUDIO_PERSONA : NINA_WELCOME_PERSONA;
  if (mode === "welcome") {
    return `${persona}

${NINA_CHAT_SITE_KNOWLEDGE}${ninaReplyLanguageSuffix(params.lang)}`;
  }
  const maggiori = buildMaggioriKnowledgeForMessages({
    message: params.message,
    history: params.history
  });
  return `${persona}

${NINA_CHAT_SITE_KNOWLEDGE}

${maggiori}${ninaReplyLanguageSuffix(params.lang)}`;
}
var TAROT_ITALIA_CHAT_SYSTEM_PROMPT = buildNinaSystemPrompt({
  message: "",
  history: [],
  mode: "welcome"
});
function readGroqApiKey() {
  const raw = process.env[GROQ_CHAT_ENV_KEY];
  if (typeof raw !== "string") return null;
  const key = raw.trim();
  return key.length > 0 ? key : null;
}
function resolveGroqChatModel() {
  const override = process.env.GROQ_CHAT_MODEL?.trim();
  return override || GROQ_CHAT_DEFAULT_MODEL;
}
function isGroqChatConfigured() {
  return readGroqApiKey() !== null;
}
function classifyGroqHttpFailure(status, providerMessage) {
  const msg = (providerMessage || "").toLowerCase();
  if (status === 401 || status === 403) return "GROQ_CHAT_AUTH";
  if (status === 413 || msg.includes("request too large") || msg.includes("payload too large") || msg.includes("context_length") || msg.includes("context length") || msg.includes("too many tokens") || msg.includes("maximum context")) {
    return "GROQ_CHAT_PAYLOAD";
  }
  if (status === 400 || status === 404 || msg.includes("decommission") || msg.includes("deprecated") || msg.includes("model_not_found") || msg.includes("model not found") || msg.includes("model") && (msg.includes("does not exist") || msg.includes("unavailable") || msg.includes("invalid"))) {
    return "GROQ_CHAT_MODEL";
  }
  return "GROQ_CHAT_UPSTREAM";
}
async function createGroqChatCompletion(params) {
  const apiKey = readGroqApiKey();
  if (!apiKey) {
    throw new Error("GROQ_CHAT_UNAVAILABLE");
  }
  const model = params.model || resolveGroqChatModel();
  const response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages: params.messages,
      temperature: params.temperature ?? 0.6,
      // gpt-oss models use reasoning tokens inside the completion budget.
      max_tokens: params.maxTokens ?? 1024,
      stream: false
    })
  });
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  if (!response.ok) {
    const code = classifyGroqHttpFailure(
      response.status,
      payload?.error?.message
    );
    console.error("Groq chat completion failed:", response.status, code);
    throw new Error(code);
  }
  const reply = payload?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    console.error("Groq chat completion returned empty content");
    throw new Error("GROQ_CHAT_EMPTY");
  }
  return reply;
}

// firebase-applet-config.json
var firebase_applet_config_default = {
  projectId: "gen-lang-client-0853491667",
  appId: "1:9386426759:web:a7195d3ae0e62315771322",
  apiKey: "AIzaSyBY6t3-t2Z7GbF1UuW7ZDYoZF8kW7Sytpo",
  authDomain: "gen-lang-client-0853491667.firebaseapp.com",
  storageBucket: "gen-lang-client-0853491667.firebasestorage.app",
  messagingSenderId: "9386426759",
  measurementId: "",
  oAuthClientId: "",
  recaptchaSiteKey: ""
};

// src/lib/firebase-admin.ts
var app;
var auth;
var initPromise;
function buildOptions(certFn) {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (raw) {
    try {
      const serviceAccount = JSON.parse(raw);
      return {
        credential: certFn(serviceAccount),
        projectId: serviceAccount.project_id || firebase_applet_config_default.projectId
      };
    } catch (error) {
      console.error(
        "FIREBASE_SERVICE_ACCOUNT_JSON non valido \u2014 fallback projectId only:",
        error
      );
    }
  }
  return { projectId: firebase_applet_config_default.projectId };
}
async function getAdminAuth() {
  if (auth) return auth;
  if (!initPromise) {
    initPromise = (async () => {
      const [{ cert, getApps, initializeApp }, { getAuth }] = await Promise.all([
        import("firebase-admin/app"),
        import("firebase-admin/auth")
      ]);
      if (!app) {
        app = getApps().length ? getApps()[0] : initializeApp(buildOptions(cert));
      }
      auth = getAuth(app);
      return auth;
    })().catch((error) => {
      initPromise = void 0;
      throw error;
    });
  }
  return initPromise;
}

// src/server/authToken.ts
function toApiUser(token) {
  return {
    uid: token.uid,
    email: token.email,
    name: typeof token.name === "string" ? token.name : void 0
  };
}
async function verifyBearerToken(authorization, mode) {
  if (!authorization || !authorization.startsWith("Bearer ")) {
    if (mode === "required") {
      return {
        ok: false,
        status: 401,
        error: "Autenticazione richiesta per accedere all\u2019Area Riservata."
      };
    }
    return { ok: true, user: null };
  }
  const token = authorization.slice("Bearer ".length);
  let adminAuth;
  try {
    adminAuth = await getAdminAuth();
  } catch (error) {
    if (mode === "optional") {
      return { ok: true, user: null };
    }
    console.error("Firebase Admin init failed:", error);
    return {
      ok: false,
      status: 503,
      error: "Servizio autenticazione non disponibile. Riprova tra poco."
    };
  }
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return { ok: true, user: toApiUser(decoded) };
  } catch (error) {
    if (mode === "optional") {
      return { ok: true, user: null };
    }
    console.error("Error verifying Firebase ID token:", error);
    return {
      ok: false,
      status: 401,
      error: "Sessione non valida o scaduta. Effettua nuovamente l\u2019accesso."
    };
  }
}

// src/server/http.ts
function json(status, body) {
  return { status, body };
}

// src/server/routes/chat.ts
var MAX_MESSAGE_CHARS = 2e3;
var MAX_HISTORY_TURNS = 12;
var MAGGIORI_COURSE_SLUG = "arcani-maggiori";
var DEMO_RESERVED_UID = "demo-reserved-enn103";
var DEMO_RESERVED_TOKEN = "demo-reserved-token";
function getChatStatus() {
  const available = isGroqChatConfigured();
  if (!available) {
    return json(200, {
      available: false,
      reason: "missing_key"
    });
  }
  return json(200, {
    available: true,
    model: resolveGroqChatModel()
  });
}
function asHistory(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const role = item.role;
    const content = item.content;
    if ((role === "user" || role === "assistant") && typeof content === "string" && content.trim()) {
      out.push({ role, content: content.trim().slice(0, MAX_MESSAGE_CHARS) });
    }
    if (out.length >= MAX_HISTORY_TURNS) break;
  }
  return out;
}
function parseMode(raw) {
  return raw === "studio" ? "studio" : "welcome";
}
function isDevDemoStudioAuth(authorization) {
  if (!authorization || !authorization.startsWith("Bearer ")) return false;
  const token = authorization.slice("Bearer ".length).trim();
  if (token !== DEMO_RESERVED_TOKEN) return false;
  return process.env.NODE_ENV !== "production" || process.env.ALLOW_DIRECT_UNLOCK === "true";
}
async function assertNinaStudioAccess(authorization, lang) {
  const gate = ninaStudioGateCopy(lang);
  if (isDevDemoStudioAuth(authorization)) {
    return null;
  }
  const auth2 = await verifyBearerToken(authorization, "required");
  if (!auth2.ok) {
    if (auth2.error) {
      console.warn("Nina Studio auth denied:", auth2.error);
    }
    return json(auth2.status, {
      available: true,
      code: "studio_auth",
      error: gate.studioAuth
    });
  }
  const user = auth2.user;
  if (!user?.uid) {
    return json(401, {
      available: true,
      code: "studio_auth",
      error: gate.studioAuth
    });
  }
  if (user.uid === DEMO_RESERVED_UID) {
    if (process.env.NODE_ENV !== "production" || process.env.ALLOW_DIRECT_UNLOCK === "true") {
      return null;
    }
    return json(403, {
      available: true,
      code: "studio_locked",
      error: gate.studioLockedDemo,
      checkoutPath: "/corsi#checkout"
    });
  }
  try {
    const { userOwnsCourse: userOwnsCourse2 } = await Promise.resolve().then(() => (init_repository(), repository_exports));
    const owns = await userOwnsCourse2({
      uid: user.uid,
      email: user.email || "",
      displayName: user.name ?? null,
      courseSlug: MAGGIORI_COURSE_SLUG
    });
    if (!owns) {
      return json(403, {
        available: true,
        code: "studio_locked",
        error: gate.studioLocked,
        checkoutPath: "/corsi#checkout"
      });
    }
    return null;
  } catch (error) {
    console.error("Nina Studio entitlement check failed:", error);
    return json(503, {
      available: true,
      code: "studio_entitlement",
      error: gate.studioEntitlement
    });
  }
}
function chatFailureResponse(code) {
  switch (code) {
    case "GROQ_CHAT_UNAVAILABLE":
      return json(503, {
        available: false,
        code: "missing_key",
        error: "Nina non \xE8 ancora attiva: manca la chiave Groq su Vercel (TAROTITALIACHATGENERICAGROQ_API_KEY). Puoi scrivere a Maria Teresa su WhatsApp, Telegram o email."
      });
    case "GROQ_CHAT_AUTH":
      return json(502, {
        available: true,
        code: "auth",
        error: "Nina non riesce ad autenticarsi con Groq. Verifica la chiave TAROTITALIACHATGENERICAGROQ_API_KEY su Vercel (Production e Preview), poi ridistribuisci. Nel frattempo usa WhatsApp, Telegram o email."
      });
    case "GROQ_CHAT_MODEL":
      return json(502, {
        available: true,
        code: "model",
        error: "Il modello Groq non \xE8 disponibile. Controlla GROQ_CHAT_MODEL oppure il default del sito, poi riprova. Nel frattempo usa WhatsApp, Telegram o email."
      });
    case "GROQ_CHAT_PAYLOAD":
      return json(502, {
        available: true,
        code: "payload",
        error: "La richiesta a Nina \xE8 troppo ampia per il modello. Prova una domanda pi\xF9 breve o specifica un solo Arcano, poi riprova. Nel frattempo usa WhatsApp, Telegram o email."
      });
    case "GROQ_CHAT_EMPTY":
      return json(502, {
        available: true,
        code: "empty",
        error: "Nina non ha ricevuto una risposta utile. Riprova tra poco oppure usa WhatsApp, Telegram o email."
      });
    default:
      return json(502, {
        available: true,
        code: "upstream",
        error: "Non riesco a rispondere in questo momento. Riprova tra poco oppure usa WhatsApp, Telegram o email."
      });
  }
}
async function postChatMessage(params) {
  const { body, authorization } = params;
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return json(400, { error: "Scrivi un messaggio per continuare." });
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return json(400, {
      error: `Il messaggio \xE8 troppo lungo (max ${MAX_MESSAGE_CHARS} caratteri).`
    });
  }
  const mode = parseMode(body.mode);
  const history = asHistory(body.history);
  const lang = normalizeNinaLang(
    typeof body.lang === "string" ? body.lang : "it"
  );
  if (mode === "studio") {
    const denied = await assertNinaStudioAccess(authorization, lang);
    if (denied) return denied;
  } else if (looksLikeDeepMaggioriStudy({ message, history })) {
    return json(200, {
      available: true,
      mode: "welcome",
      locked: true,
      code: "studio_locked",
      reply: ninaStudioSoftLockReply(lang),
      checkoutPath: "/corsi#checkout"
    });
  }
  if (!isGroqChatConfigured()) {
    return chatFailureResponse("GROQ_CHAT_UNAVAILABLE");
  }
  const systemPrompt = buildNinaSystemPrompt({
    message,
    history,
    lang,
    mode
  });
  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: message }
  ];
  try {
    const reply = await createGroqChatCompletion({ messages });
    return json(200, { available: true, mode, reply });
  } catch (error) {
    const code = error instanceof Error ? error.message : "";
    if (code.startsWith("GROQ_CHAT_")) {
      return chatFailureResponse(code);
    }
    console.error("postChatMessage failed:", code || error);
    return chatFailureResponse("GROQ_CHAT_UPSTREAM");
  }
}

// src/server/nodeHttp.ts
function sendJson(res, status, body) {
  if (typeof res.status === "function" && typeof res.json === "function") {
    res.status(status).json(body);
    return;
  }
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}
function readBodyObject(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return req.body;
  }
  if (typeof req.body === "string" && req.body.trim()) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

// src/server/apiEntries/chat.ts
var config = { runtime: "nodejs", maxDuration: 30 };
function readAuthorization(req) {
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (key.toLowerCase() !== "authorization") continue;
    const raw = Array.isArray(value) ? value[0] : value;
    const trimmed = raw?.trim();
    return trimmed || void 0;
  }
  return void 0;
}
async function handler(req, res) {
  try {
    const method = (req.method || "GET").toUpperCase();
    if (method === "GET") {
      const result = getChatStatus();
      return sendJson(res, result.status, result.body);
    }
    if (method === "POST") {
      const result = await postChatMessage({
        body: readBodyObject(req),
        authorization: readAuthorization(req)
      });
      return sendJson(res, result.status, result.body);
    }
    res.setHeader("Allow", "GET, POST");
    return sendJson(res, 405, { error: "Metodo non consentito." });
  } catch (error) {
    console.error("api/chat handler failed:", error);
    return sendJson(res, 500, {
      error: "Internal server error",
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}
export {
  config,
  handler as default
};
