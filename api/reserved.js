var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/drizzle-orm/node-postgres/driver.js
import pg2 from "pg";

// node_modules/drizzle-orm/entity.js
var entityKind = /* @__PURE__ */ Symbol.for("drizzle:entityKind");
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

// node_modules/drizzle-orm/logger.js
var ConsoleLogWriter = class {
  static [entityKind] = "ConsoleLogWriter";
  write(message) {
    console.log(message);
  }
};
var DefaultLogger = class {
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
var NoopLogger = class {
  static [entityKind] = "NoopLogger";
  logQuery() {
  }
};

// node_modules/drizzle-orm/query-promise.js
var QueryPromise = class {
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

// node_modules/drizzle-orm/column.js
var Column = class {
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

// node_modules/drizzle-orm/column-builder.js
var ColumnBuilder = class {
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

// node_modules/drizzle-orm/table.utils.js
var TableName = /* @__PURE__ */ Symbol.for("drizzle:Name");

// node_modules/drizzle-orm/pg-core/foreign-keys.js
var ForeignKeyBuilder = class {
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
var ForeignKey = class {
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

// node_modules/drizzle-orm/tracing-utils.js
function iife(fn, ...args) {
  return fn(...args);
}

// node_modules/drizzle-orm/pg-core/unique-constraint.js
function uniqueKeyName(table, columns) {
  return `${table[TableName]}_${columns.join("_")}_unique`;
}
var UniqueConstraintBuilder = class {
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
var UniqueOnConstraintBuilder = class {
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
var UniqueConstraint = class {
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

// node_modules/drizzle-orm/pg-core/columns/common.js
var PgColumnBuilder = class extends ColumnBuilder {
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
var PgColumn = class extends Column {
  constructor(table, config2) {
    if (!config2.uniqueName) {
      config2.uniqueName = uniqueKeyName(table, [config2.name]);
    }
    super(table, config2);
    this.table = table;
  }
  static [entityKind] = "PgColumn";
};
var ExtraConfigColumn = class extends PgColumn {
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
var IndexedColumn = class {
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
var PgArrayBuilder = class extends PgColumnBuilder {
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
var PgArray = class _PgArray extends PgColumn {
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

// node_modules/drizzle-orm/pg-core/columns/enum.js
var PgEnumObjectColumnBuilder = class extends PgColumnBuilder {
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
var PgEnumObjectColumn = class extends PgColumn {
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
var isPgEnumSym = /* @__PURE__ */ Symbol.for("drizzle:isPgEnum");
function isPgEnum(obj) {
  return !!obj && typeof obj === "function" && isPgEnumSym in obj && obj[isPgEnumSym] === true;
}
var PgEnumColumnBuilder = class extends PgColumnBuilder {
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
var PgEnumColumn = class extends PgColumn {
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

// node_modules/drizzle-orm/subquery.js
var Subquery = class {
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
var WithSubquery = class extends Subquery {
  static [entityKind] = "WithSubquery";
};

// node_modules/drizzle-orm/version.js
var version = "0.45.4";

// node_modules/drizzle-orm/tracing.js
var otel;
var rawTracer;
var tracer = {
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

// node_modules/drizzle-orm/view-common.js
var ViewBaseConfig = /* @__PURE__ */ Symbol.for("drizzle:ViewBaseConfig");

// node_modules/drizzle-orm/table.js
var Schema = /* @__PURE__ */ Symbol.for("drizzle:Schema");
var Columns = /* @__PURE__ */ Symbol.for("drizzle:Columns");
var ExtraConfigColumns = /* @__PURE__ */ Symbol.for("drizzle:ExtraConfigColumns");
var OriginalName = /* @__PURE__ */ Symbol.for("drizzle:OriginalName");
var BaseName = /* @__PURE__ */ Symbol.for("drizzle:BaseName");
var IsAlias = /* @__PURE__ */ Symbol.for("drizzle:IsAlias");
var ExtraConfigBuilder = /* @__PURE__ */ Symbol.for("drizzle:ExtraConfigBuilder");
var IsDrizzleTable = /* @__PURE__ */ Symbol.for("drizzle:IsDrizzleTable");
var Table = class {
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
function getTableName(table) {
  return table[TableName];
}
function getTableUniqueName(table) {
  return `${table[Schema] ?? "public"}.${table[TableName]}`;
}

// node_modules/drizzle-orm/sql/sql.js
var FakePrimitiveParam = class {
  static [entityKind] = "FakePrimitiveParam";
};
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
var StringChunk = class {
  static [entityKind] = "StringChunk";
  value;
  constructor(value) {
    this.value = Array.isArray(value) ? value : [value];
  }
  getSQL() {
    return new SQL([this]);
  }
};
var SQL = class _SQL {
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
var Name = class {
  constructor(value) {
    this.value = value;
  }
  static [entityKind] = "Name";
  brand;
  getSQL() {
    return new SQL([this]);
  }
};
function isDriverValueEncoder(value) {
  return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
}
var noopDecoder = {
  mapFromDriverValue: (value) => value
};
var noopEncoder = {
  mapToDriverValue: (value) => value
};
var noopMapper = {
  ...noopDecoder,
  ...noopEncoder
};
var Param = class {
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
var Placeholder = class {
  constructor(name2) {
    this.name = name2;
  }
  static [entityKind] = "Placeholder";
  getSQL() {
    return new SQL([this]);
  }
};
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
var IsDrizzleView = /* @__PURE__ */ Symbol.for("drizzle:IsDrizzleView");
var View = class {
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

// node_modules/drizzle-orm/alias.js
var ColumnAliasProxyHandler = class {
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
var TableAliasProxyHandler = class {
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
var RelationTableAliasProxyHandler = class {
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

// node_modules/drizzle-orm/selection-proxy.js
var SelectionProxyHandler = class _SelectionProxyHandler {
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

// node_modules/drizzle-orm/utils.js
function mapResultRow(columns, row, joinsNotNullableMap) {
  const nullifyMap = {};
  const result = columns.reduce(
    (result2, { path: path2, field }, columnIndex) => {
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
      for (const [pathChunkIndex, pathChunk] of path2.entries()) {
        if (pathChunkIndex < path2.length - 1) {
          if (!(pathChunk in node)) {
            node[pathChunk] = {};
          }
          node = node[pathChunk];
        } else {
          const rawValue = row[columnIndex];
          const value = node[pathChunk] = rawValue === null ? null : decoder.mapFromDriverValue(rawValue);
          if (joinsNotNullableMap && is(field, Column) && path2.length === 2) {
            const objectName = path2[0];
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
var textDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder();

// node_modules/drizzle-orm/pg-core/columns/int.common.js
var PgIntColumnBaseBuilder = class extends PgColumnBuilder {
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

// node_modules/drizzle-orm/pg-core/columns/bigint.js
var PgBigInt53Builder = class extends PgIntColumnBaseBuilder {
  static [entityKind] = "PgBigInt53Builder";
  constructor(name) {
    super(name, "number", "PgBigInt53");
  }
  /** @internal */
  build(table) {
    return new PgBigInt53(table, this.config);
  }
};
var PgBigInt53 = class extends PgColumn {
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
var PgBigInt64Builder = class extends PgIntColumnBaseBuilder {
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
var PgBigInt64 = class extends PgColumn {
  static [entityKind] = "PgBigInt64";
  getSQLType() {
    return "bigint";
  }
  // eslint-disable-next-line unicorn/prefer-native-coercion-functions
  mapFromDriverValue(value) {
    return BigInt(value);
  }
};
function bigint(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  if (config2.mode === "number") {
    return new PgBigInt53Builder(name);
  }
  return new PgBigInt64Builder(name);
}

// node_modules/drizzle-orm/pg-core/columns/bigserial.js
var PgBigSerial53Builder = class extends PgColumnBuilder {
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
var PgBigSerial53 = class extends PgColumn {
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
var PgBigSerial64Builder = class extends PgColumnBuilder {
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
var PgBigSerial64 = class extends PgColumn {
  static [entityKind] = "PgBigSerial64";
  getSQLType() {
    return "bigserial";
  }
  // eslint-disable-next-line unicorn/prefer-native-coercion-functions
  mapFromDriverValue(value) {
    return BigInt(value);
  }
};
function bigserial(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  if (config2.mode === "number") {
    return new PgBigSerial53Builder(name);
  }
  return new PgBigSerial64Builder(name);
}

// node_modules/drizzle-orm/pg-core/columns/boolean.js
var PgBooleanBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgBooleanBuilder";
  constructor(name) {
    super(name, "boolean", "PgBoolean");
  }
  /** @internal */
  build(table) {
    return new PgBoolean(table, this.config);
  }
};
var PgBoolean = class extends PgColumn {
  static [entityKind] = "PgBoolean";
  getSQLType() {
    return "boolean";
  }
};
function boolean(name) {
  return new PgBooleanBuilder(name ?? "");
}

// node_modules/drizzle-orm/pg-core/columns/char.js
var PgCharBuilder = class extends PgColumnBuilder {
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
var PgChar = class extends PgColumn {
  static [entityKind] = "PgChar";
  length = this.config.length;
  enumValues = this.config.enumValues;
  getSQLType() {
    return this.length === void 0 ? `char` : `char(${this.length})`;
  }
};
function char(a, b = {}) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgCharBuilder(name, config2);
}

// node_modules/drizzle-orm/pg-core/columns/cidr.js
var PgCidrBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgCidrBuilder";
  constructor(name) {
    super(name, "string", "PgCidr");
  }
  /** @internal */
  build(table) {
    return new PgCidr(table, this.config);
  }
};
var PgCidr = class extends PgColumn {
  static [entityKind] = "PgCidr";
  getSQLType() {
    return "cidr";
  }
};
function cidr(name) {
  return new PgCidrBuilder(name ?? "");
}

// node_modules/drizzle-orm/pg-core/columns/custom.js
var PgCustomColumnBuilder = class extends PgColumnBuilder {
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
var PgCustomColumn = class extends PgColumn {
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
function customType(customTypeParams) {
  return (a, b) => {
    const { name, config: config2 } = getColumnNameAndConfig(a, b);
    return new PgCustomColumnBuilder(name, config2, customTypeParams);
  };
}

// node_modules/drizzle-orm/pg-core/columns/date.common.js
var PgDateColumnBaseBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgDateColumnBaseBuilder";
  defaultNow() {
    return this.default(sql`now()`);
  }
};

// node_modules/drizzle-orm/pg-core/columns/date.js
var PgDateBuilder = class extends PgDateColumnBaseBuilder {
  static [entityKind] = "PgDateBuilder";
  constructor(name) {
    super(name, "date", "PgDate");
  }
  /** @internal */
  build(table) {
    return new PgDate(table, this.config);
  }
};
var PgDate = class extends PgColumn {
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
var PgDateStringBuilder = class extends PgDateColumnBaseBuilder {
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
var PgDateString = class extends PgColumn {
  static [entityKind] = "PgDateString";
  getSQLType() {
    return "date";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") return value;
    return value.toISOString().slice(0, -14);
  }
};
function date(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  if (config2?.mode === "date") {
    return new PgDateBuilder(name);
  }
  return new PgDateStringBuilder(name);
}

// node_modules/drizzle-orm/pg-core/columns/double-precision.js
var PgDoublePrecisionBuilder = class extends PgColumnBuilder {
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
var PgDoublePrecision = class extends PgColumn {
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
function doublePrecision(name) {
  return new PgDoublePrecisionBuilder(name ?? "");
}

// node_modules/drizzle-orm/pg-core/columns/inet.js
var PgInetBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgInetBuilder";
  constructor(name) {
    super(name, "string", "PgInet");
  }
  /** @internal */
  build(table) {
    return new PgInet(table, this.config);
  }
};
var PgInet = class extends PgColumn {
  static [entityKind] = "PgInet";
  getSQLType() {
    return "inet";
  }
};
function inet(name) {
  return new PgInetBuilder(name ?? "");
}

// node_modules/drizzle-orm/pg-core/columns/integer.js
var PgIntegerBuilder = class extends PgIntColumnBaseBuilder {
  static [entityKind] = "PgIntegerBuilder";
  constructor(name) {
    super(name, "number", "PgInteger");
  }
  /** @internal */
  build(table) {
    return new PgInteger(table, this.config);
  }
};
var PgInteger = class extends PgColumn {
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
function integer(name) {
  return new PgIntegerBuilder(name ?? "");
}

// node_modules/drizzle-orm/pg-core/columns/interval.js
var PgIntervalBuilder = class extends PgColumnBuilder {
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
var PgInterval = class extends PgColumn {
  static [entityKind] = "PgInterval";
  fields = this.config.intervalConfig.fields;
  precision = this.config.intervalConfig.precision;
  getSQLType() {
    const fields = this.fields ? ` ${this.fields}` : "";
    const precision = this.precision ? `(${this.precision})` : "";
    return `interval${fields}${precision}`;
  }
};
function interval(a, b = {}) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgIntervalBuilder(name, config2);
}

// node_modules/drizzle-orm/pg-core/columns/json.js
var PgJsonBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgJsonBuilder";
  constructor(name) {
    super(name, "json", "PgJson");
  }
  /** @internal */
  build(table) {
    return new PgJson(table, this.config);
  }
};
var PgJson = class extends PgColumn {
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
function json(name) {
  return new PgJsonBuilder(name ?? "");
}

// node_modules/drizzle-orm/pg-core/columns/jsonb.js
var PgJsonbBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgJsonbBuilder";
  constructor(name) {
    super(name, "json", "PgJsonb");
  }
  /** @internal */
  build(table) {
    return new PgJsonb(table, this.config);
  }
};
var PgJsonb = class extends PgColumn {
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
function jsonb(name) {
  return new PgJsonbBuilder(name ?? "");
}

// node_modules/drizzle-orm/pg-core/columns/line.js
var PgLineBuilder = class extends PgColumnBuilder {
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
var PgLineTuple = class extends PgColumn {
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
var PgLineABCBuilder = class extends PgColumnBuilder {
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
var PgLineABC = class extends PgColumn {
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
function line(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  if (!config2?.mode || config2.mode === "tuple") {
    return new PgLineBuilder(name);
  }
  return new PgLineABCBuilder(name);
}

// node_modules/drizzle-orm/pg-core/columns/macaddr.js
var PgMacaddrBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgMacaddrBuilder";
  constructor(name) {
    super(name, "string", "PgMacaddr");
  }
  /** @internal */
  build(table) {
    return new PgMacaddr(table, this.config);
  }
};
var PgMacaddr = class extends PgColumn {
  static [entityKind] = "PgMacaddr";
  getSQLType() {
    return "macaddr";
  }
};
function macaddr(name) {
  return new PgMacaddrBuilder(name ?? "");
}

// node_modules/drizzle-orm/pg-core/columns/macaddr8.js
var PgMacaddr8Builder = class extends PgColumnBuilder {
  static [entityKind] = "PgMacaddr8Builder";
  constructor(name) {
    super(name, "string", "PgMacaddr8");
  }
  /** @internal */
  build(table) {
    return new PgMacaddr8(table, this.config);
  }
};
var PgMacaddr8 = class extends PgColumn {
  static [entityKind] = "PgMacaddr8";
  getSQLType() {
    return "macaddr8";
  }
};
function macaddr8(name) {
  return new PgMacaddr8Builder(name ?? "");
}

// node_modules/drizzle-orm/pg-core/columns/numeric.js
var PgNumericBuilder = class extends PgColumnBuilder {
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
var PgNumeric = class extends PgColumn {
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
var PgNumericNumberBuilder = class extends PgColumnBuilder {
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
var PgNumericNumber = class extends PgColumn {
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
var PgNumericBigIntBuilder = class extends PgColumnBuilder {
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
var PgNumericBigInt = class extends PgColumn {
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
function numeric(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  const mode = config2?.mode;
  return mode === "number" ? new PgNumericNumberBuilder(name, config2?.precision, config2?.scale) : mode === "bigint" ? new PgNumericBigIntBuilder(name, config2?.precision, config2?.scale) : new PgNumericBuilder(name, config2?.precision, config2?.scale);
}

// node_modules/drizzle-orm/pg-core/columns/point.js
var PgPointTupleBuilder = class extends PgColumnBuilder {
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
var PgPointTuple = class extends PgColumn {
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
var PgPointObjectBuilder = class extends PgColumnBuilder {
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
var PgPointObject = class extends PgColumn {
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
function point(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  if (!config2?.mode || config2.mode === "tuple") {
    return new PgPointTupleBuilder(name);
  }
  return new PgPointObjectBuilder(name);
}

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

// node_modules/drizzle-orm/pg-core/columns/postgis_extension/geometry.js
var PgGeometryBuilder = class extends PgColumnBuilder {
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
var PgGeometry = class extends PgColumn {
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
var PgGeometryObjectBuilder = class extends PgColumnBuilder {
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
var PgGeometryObject = class extends PgColumn {
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
function geometry(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  if (!config2?.mode || config2.mode === "tuple") {
    return new PgGeometryBuilder(name);
  }
  return new PgGeometryObjectBuilder(name);
}

// node_modules/drizzle-orm/pg-core/columns/real.js
var PgRealBuilder = class extends PgColumnBuilder {
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
var PgReal = class extends PgColumn {
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
function real(name) {
  return new PgRealBuilder(name ?? "");
}

// node_modules/drizzle-orm/pg-core/columns/serial.js
var PgSerialBuilder = class extends PgColumnBuilder {
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
var PgSerial = class extends PgColumn {
  static [entityKind] = "PgSerial";
  getSQLType() {
    return "serial";
  }
};
function serial(name) {
  return new PgSerialBuilder(name ?? "");
}

// node_modules/drizzle-orm/pg-core/columns/smallint.js
var PgSmallIntBuilder = class extends PgIntColumnBaseBuilder {
  static [entityKind] = "PgSmallIntBuilder";
  constructor(name) {
    super(name, "number", "PgSmallInt");
  }
  /** @internal */
  build(table) {
    return new PgSmallInt(table, this.config);
  }
};
var PgSmallInt = class extends PgColumn {
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
function smallint(name) {
  return new PgSmallIntBuilder(name ?? "");
}

// node_modules/drizzle-orm/pg-core/columns/smallserial.js
var PgSmallSerialBuilder = class extends PgColumnBuilder {
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
var PgSmallSerial = class extends PgColumn {
  static [entityKind] = "PgSmallSerial";
  getSQLType() {
    return "smallserial";
  }
};
function smallserial(name) {
  return new PgSmallSerialBuilder(name ?? "");
}

// node_modules/drizzle-orm/pg-core/columns/text.js
var PgTextBuilder = class extends PgColumnBuilder {
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
var PgText = class extends PgColumn {
  static [entityKind] = "PgText";
  enumValues = this.config.enumValues;
  getSQLType() {
    return "text";
  }
};
function text(a, b = {}) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgTextBuilder(name, config2);
}

// node_modules/drizzle-orm/pg-core/columns/time.js
var PgTimeBuilder = class extends PgDateColumnBaseBuilder {
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
var PgTime = class extends PgColumn {
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
function time(a, b = {}) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgTimeBuilder(name, config2.withTimezone ?? false, config2.precision);
}

// node_modules/drizzle-orm/pg-core/columns/timestamp.js
var PgTimestampBuilder = class extends PgDateColumnBaseBuilder {
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
var PgTimestamp = class extends PgColumn {
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
var PgTimestampStringBuilder = class extends PgDateColumnBaseBuilder {
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
var PgTimestampString = class extends PgColumn {
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
function timestamp(a, b = {}) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  if (config2?.mode === "string") {
    return new PgTimestampStringBuilder(name, config2.withTimezone ?? false, config2.precision);
  }
  return new PgTimestampBuilder(name, config2?.withTimezone ?? false, config2?.precision);
}

// node_modules/drizzle-orm/pg-core/columns/uuid.js
var PgUUIDBuilder = class extends PgColumnBuilder {
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
var PgUUID = class extends PgColumn {
  static [entityKind] = "PgUUID";
  getSQLType() {
    return "uuid";
  }
};
function uuid(name) {
  return new PgUUIDBuilder(name ?? "");
}

// node_modules/drizzle-orm/pg-core/columns/varchar.js
var PgVarcharBuilder = class extends PgColumnBuilder {
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
var PgVarchar = class extends PgColumn {
  static [entityKind] = "PgVarchar";
  length = this.config.length;
  enumValues = this.config.enumValues;
  getSQLType() {
    return this.length === void 0 ? `varchar` : `varchar(${this.length})`;
  }
};
function varchar(a, b = {}) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgVarcharBuilder(name, config2);
}

// node_modules/drizzle-orm/pg-core/columns/vector_extension/bit.js
var PgBinaryVectorBuilder = class extends PgColumnBuilder {
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
var PgBinaryVector = class extends PgColumn {
  static [entityKind] = "PgBinaryVector";
  dimensions = this.config.dimensions;
  getSQLType() {
    return `bit(${this.dimensions})`;
  }
};
function bit(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgBinaryVectorBuilder(name, config2);
}

// node_modules/drizzle-orm/pg-core/columns/vector_extension/halfvec.js
var PgHalfVectorBuilder = class extends PgColumnBuilder {
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
var PgHalfVector = class extends PgColumn {
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
function halfvec(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgHalfVectorBuilder(name, config2);
}

// node_modules/drizzle-orm/pg-core/columns/vector_extension/sparsevec.js
var PgSparseVectorBuilder = class extends PgColumnBuilder {
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
var PgSparseVector = class extends PgColumn {
  static [entityKind] = "PgSparseVector";
  dimensions = this.config.dimensions;
  getSQLType() {
    return `sparsevec(${this.dimensions})`;
  }
};
function sparsevec(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgSparseVectorBuilder(name, config2);
}

// node_modules/drizzle-orm/pg-core/columns/vector_extension/vector.js
var PgVectorBuilder = class extends PgColumnBuilder {
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
var PgVector = class extends PgColumn {
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
function vector(a, b) {
  const { name, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgVectorBuilder(name, config2);
}

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
    json,
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

// node_modules/drizzle-orm/pg-core/table.js
var InlineForeignKeys = /* @__PURE__ */ Symbol.for("drizzle:PgInlineForeignKeys");
var EnableRLS = /* @__PURE__ */ Symbol.for("drizzle:EnableRLS");
var PgTable = class extends Table {
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
var pgTable = (name, columns, extraConfig) => {
  return pgTableWithSchema(name, columns, extraConfig, void 0);
};

// node_modules/drizzle-orm/pg-core/indexes.js
var IndexBuilderOn = class {
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
var IndexBuilder = class {
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
var Index = class {
  static [entityKind] = "PgIndex";
  config;
  constructor(config2, table) {
    this.config = { ...config2, table };
  }
};
function index(name) {
  return new IndexBuilderOn(false, name);
}
function uniqueIndex(name) {
  return new IndexBuilderOn(true, name);
}

// node_modules/drizzle-orm/pg-core/primary-keys.js
var PrimaryKeyBuilder = class {
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
var PrimaryKey = class {
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
var CasingCache = class {
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

// node_modules/drizzle-orm/errors.js
var DrizzleError = class extends Error {
  static [entityKind] = "DrizzleError";
  constructor({ message, cause }) {
    super(message);
    this.name = "DrizzleError";
    this.cause = cause;
  }
};
var DrizzleQueryError = class _DrizzleQueryError extends Error {
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
var TransactionRollbackError = class extends DrizzleError {
  static [entityKind] = "TransactionRollbackError";
  constructor() {
    super({ message: "Rollback" });
  }
};

// node_modules/drizzle-orm/sql/expressions/conditions.js
function bindIfParam(value, column) {
  if (isDriverValueEncoder(column) && !isSQLWrapper(value) && !is(value, Param) && !is(value, Placeholder) && !is(value, Column) && !is(value, Table) && !is(value, View)) {
    return new Param(value, column);
  }
  return value;
}
var eq = (left, right) => {
  return sql`${left} = ${bindIfParam(right, left)}`;
};
var ne = (left, right) => {
  return sql`${left} <> ${bindIfParam(right, left)}`;
};
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
var gt = (left, right) => {
  return sql`${left} > ${bindIfParam(right, left)}`;
};
var gte = (left, right) => {
  return sql`${left} >= ${bindIfParam(right, left)}`;
};
var lt = (left, right) => {
  return sql`${left} < ${bindIfParam(right, left)}`;
};
var lte = (left, right) => {
  return sql`${left} <= ${bindIfParam(right, left)}`;
};
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

// node_modules/drizzle-orm/sql/expressions/select.js
function asc(column) {
  return sql`${column} asc`;
}
function desc(column) {
  return sql`${column} desc`;
}

// node_modules/drizzle-orm/relations.js
var Relation = class {
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
var Relations = class {
  constructor(table, config2) {
    this.table = table;
    this.config = config2;
  }
  static [entityKind] = "Relations";
};
var One = class _One extends Relation {
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
var Many = class _Many extends Relation {
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

// node_modules/drizzle-orm/pg-core/view-base.js
var PgViewBase = class extends View {
  static [entityKind] = "PgViewBase";
};

// node_modules/drizzle-orm/pg-core/dialect.js
var PgDialect = class {
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

// node_modules/drizzle-orm/query-builders/query-builder.js
var TypedQueryBuilder = class {
  static [entityKind] = "TypedQueryBuilder";
  /** @internal */
  getSelectedFields() {
    return this._.selectedFields;
  }
};

// node_modules/drizzle-orm/pg-core/query-builders/select.js
var PgSelectBuilder = class {
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
var PgSelectQueryBuilderBase = class extends TypedQueryBuilder {
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
var PgSelectBase = class extends PgSelectQueryBuilderBase {
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
var getPgSetOperators = () => ({
  union,
  unionAll,
  intersect,
  intersectAll,
  except,
  exceptAll
});
var union = createSetOperator("union", false);
var unionAll = createSetOperator("union", true);
var intersect = createSetOperator("intersect", false);
var intersectAll = createSetOperator("intersect", true);
var except = createSetOperator("except", false);
var exceptAll = createSetOperator("except", true);

// node_modules/drizzle-orm/pg-core/query-builders/query-builder.js
var QueryBuilder = class {
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

// node_modules/drizzle-orm/pg-core/query-builders/delete.js
var PgDeleteBase = class extends QueryPromise {
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

// node_modules/drizzle-orm/pg-core/query-builders/insert.js
var PgInsertBuilder = class {
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
var PgInsertBase = class extends QueryPromise {
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

// node_modules/drizzle-orm/pg-core/query-builders/refresh-materialized-view.js
var PgRefreshMaterializedView = class extends QueryPromise {
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

// node_modules/drizzle-orm/pg-core/query-builders/update.js
var PgUpdateBuilder = class {
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
var PgUpdateBase = class extends QueryPromise {
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

// node_modules/drizzle-orm/pg-core/query-builders/count.js
var PgCountBuilder = class _PgCountBuilder extends SQL {
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

// node_modules/drizzle-orm/pg-core/query-builders/query.js
var RelationalQueryBuilder = class {
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
var PgRelationalQuery = class extends QueryPromise {
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

// node_modules/drizzle-orm/pg-core/query-builders/raw.js
var PgRaw = class extends QueryPromise {
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

// node_modules/drizzle-orm/pg-core/db.js
var PgDatabase = class {
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

// node_modules/drizzle-orm/node-postgres/session.js
import pg from "pg";

// node_modules/drizzle-orm/cache/core/cache.js
var Cache = class {
  static [entityKind] = "Cache";
};
var NoopCache = class extends Cache {
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
async function hashQuery(sql2, params) {
  const dataToHash = `${sql2}-${JSON.stringify(params)}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(dataToHash);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = [...new Uint8Array(hashBuffer)];
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

// node_modules/drizzle-orm/pg-core/session.js
var PgPreparedQuery = class {
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
  async queryWithCache(queryString2, params, query) {
    if (this.cache === void 0 || is(this.cache, NoopCache) || this.queryMetadata === void 0) {
      try {
        return await query();
      } catch (e) {
        throw new DrizzleQueryError(queryString2, params, e);
      }
    }
    if (this.cacheConfig && !this.cacheConfig.enable) {
      try {
        return await query();
      } catch (e) {
        throw new DrizzleQueryError(queryString2, params, e);
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
        throw new DrizzleQueryError(queryString2, params, e);
      }
    }
    if (!this.cacheConfig) {
      try {
        return await query();
      } catch (e) {
        throw new DrizzleQueryError(queryString2, params, e);
      }
    }
    if (this.queryMetadata.type === "select") {
      const fromCache = await this.cache.get(
        this.cacheConfig.tag ?? await hashQuery(queryString2, params),
        this.queryMetadata.tables,
        this.cacheConfig.tag !== void 0,
        this.cacheConfig.autoInvalidate
      );
      if (fromCache === void 0) {
        let result;
        try {
          result = await query();
        } catch (e) {
          throw new DrizzleQueryError(queryString2, params, e);
        }
        await this.cache.put(
          this.cacheConfig.tag ?? await hashQuery(queryString2, params),
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
      throw new DrizzleQueryError(queryString2, params, e);
    }
  }
};
var PgSession = class {
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
var PgTransaction = class extends PgDatabase {
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

// node_modules/drizzle-orm/node-postgres/session.js
var { Pool, types } = pg;
var NodePgPreparedQuery = class extends PgPreparedQuery {
  constructor(client, queryString2, params, logger, cache, queryMetadata, cacheConfig, fields, name, _isResponseInArrayMode, customResultMapper) {
    super({ sql: queryString2, params }, cache, queryMetadata, cacheConfig);
    this.client = client;
    this.queryString = queryString2;
    this.params = params;
    this.logger = logger;
    this.fields = fields;
    this._isResponseInArrayMode = _isResponseInArrayMode;
    this.customResultMapper = customResultMapper;
    this.rawQueryConfig = {
      name,
      text: queryString2,
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
      text: queryString2,
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
var NodePgSession = class _NodePgSession extends PgSession {
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
var NodePgTransaction = class _NodePgTransaction extends PgTransaction {
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

// node_modules/drizzle-orm/node-postgres/driver.js
var NodePgDriver = class {
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
var NodePgDatabase = class extends PgDatabase {
  static [entityKind] = "NodePgDatabase";
};
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
((drizzle2) => {
  function mock(config2) {
    return construct({}, config2);
  }
  drizzle2.mock = mock;
})(drizzle || (drizzle = {}));

// src/db/index.ts
import { Pool as Pool2 } from "pg";

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
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  uid: text("uid").notNull().unique(),
  email: text("email").notNull(),
  displayName: text("display_name"),
  phoneWhatsapp: text("phone_whatsapp"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var courses = pgTable("courses", {
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
var dispense = pgTable(
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
var coursePurchases = pgTable(
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
var dispensaProgress = pgTable(
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
var consultationBookings = pgTable(
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
var dialogueSessions = pgTable("dialogue_sessions", {
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
var dialoguePurchases = pgTable("dialogue_purchases", {
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
var userNotes = pgTable(
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
var usersRelations = relations(users, ({ many }) => ({
  purchases: many(coursePurchases),
  dispensaProgress: many(dispensaProgress),
  bookings: many(consultationBookings),
  dialogueSessions: many(dialogueSessions),
  dialoguePurchases: many(dialoguePurchases),
  notes: many(userNotes)
}));
var coursesRelations = relations(courses, ({ many }) => ({
  dispense: many(dispense),
  purchases: many(coursePurchases)
}));
var dispenseRelations = relations(dispense, ({ one, many }) => ({
  course: one(courses, {
    fields: [dispense.courseId],
    references: [courses.id]
  }),
  progressRecords: many(dispensaProgress)
}));
var coursePurchasesRelations = relations(coursePurchases, ({ one }) => ({
  user: one(users, {
    fields: [coursePurchases.userId],
    references: [users.id]
  }),
  course: one(courses, {
    fields: [coursePurchases.courseId],
    references: [courses.id]
  })
}));
var dispensaProgressRelations = relations(dispensaProgress, ({ one }) => ({
  user: one(users, {
    fields: [dispensaProgress.userId],
    references: [users.id]
  }),
  dispensa: one(dispense, {
    fields: [dispensaProgress.dispensaId],
    references: [dispense.id]
  })
}));
var consultationBookingsRelations = relations(consultationBookings, ({ one }) => ({
  user: one(users, {
    fields: [consultationBookings.userId],
    references: [users.id]
  })
}));
var dialogueSessionsRelations = relations(dialogueSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [dialogueSessions.userId],
    references: [users.id]
  }),
  purchases: many(dialoguePurchases)
}));
var dialoguePurchasesRelations = relations(dialoguePurchases, ({ one }) => ({
  session: one(dialogueSessions, {
    fields: [dialoguePurchases.dialogueSessionId],
    references: [dialogueSessions.id]
  }),
  user: one(users, {
    fields: [dialoguePurchases.userId],
    references: [users.id]
  })
}));
var userNotesRelations = relations(userNotes, ({ one }) => ({
  user: one(users, {
    fields: [userNotes.userId],
    references: [users.id]
  })
}));

// src/db/index.ts
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
var createPool = () => {
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
function getDb() {
  if (!global._ennamoDb) {
    global._ennamoDb = drizzle(createPool(), { schema: schema_exports });
  }
  return global._ennamoDb;
}
var db = new Proxy({}, {
  get(_target, prop, receiver) {
    const real2 = getDb();
    const value = Reflect.get(real2, prop, receiver);
    return typeof value === "function" ? value.bind(real2) : value;
  }
});

// src/db/ensureBookingSchema.ts
function hasDatabaseConfig() {
  return Boolean(
    process.env.DATABASE_URL?.trim() || process.env.SQL_HOST?.trim()
  );
}
var SCHEMA_BOOTSTRAP_STATEMENTS = [
  // --- CREATE (FK order) ---
  `CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    uid text NOT NULL UNIQUE,
    email text NOT NULL,
    display_name text,
    phone_whatsapp text,
    created_at timestamp DEFAULT NOW() NOT NULL,
    updated_at timestamp DEFAULT NOW() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS courses (
    id serial PRIMARY KEY,
    slug text NOT NULL UNIQUE,
    title text NOT NULL,
    subtitle text NOT NULL,
    description text NOT NULL,
    price_eur integer NOT NULL,
    stripe_price_id text NOT NULL,
    lessons_count integer NOT NULL,
    total_hours text NOT NULL,
    level_label text NOT NULL,
    sort_order integer NOT NULL,
    is_published boolean DEFAULT true NOT NULL,
    created_at timestamp DEFAULT NOW() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS dispense (
    id serial PRIMARY KEY,
    course_id integer NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    module_number text NOT NULL,
    title text NOT NULL,
    subtitle text NOT NULL,
    format text NOT NULL,
    reading_minutes integer NOT NULL,
    content_markdown text NOT NULL,
    key_takeaways text NOT NULL,
    sort_order integer NOT NULL,
    created_at timestamp DEFAULT NOW() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS course_purchases (
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id integer NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    status text NOT NULL DEFAULT 'active',
    payment_provider text NOT NULL DEFAULT 'stripe_checkout',
    stripe_session_id text,
    amount_paid_eur integer NOT NULL,
    customer_name text NOT NULL,
    customer_phone text,
    purchased_at timestamp DEFAULT NOW() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS dispensa_progress (
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    dispensa_id integer NOT NULL REFERENCES dispense(id) ON DELETE CASCADE,
    completed boolean DEFAULT false NOT NULL,
    personal_notes text DEFAULT '' NOT NULL,
    updated_at timestamp DEFAULT NOW() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS consultation_bookings (
    id serial PRIMARY KEY,
    user_id integer REFERENCES users(id) ON DELETE SET NULL,
    tariff_id text NOT NULL,
    duration_minutes integer NOT NULL,
    price_eur integer NOT NULL,
    scheduled_date text NOT NULL,
    scheduled_time text NOT NULL,
    full_name text NOT NULL,
    email text NOT NULL,
    phone_whatsapp text NOT NULL,
    session_intent text DEFAULT '' NOT NULL,
    deontology_accepted boolean NOT NULL,
    mode text NOT NULL DEFAULT 'remote',
    status text NOT NULL DEFAULT 'pending_payment',
    stripe_session_id text,
    stripe_payment_intent_id text,
    google_calendar_event_id text,
    paid_at timestamp,
    created_at timestamp DEFAULT NOW() NOT NULL,
    updated_at timestamp DEFAULT NOW() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS dialogue_sessions (
    id serial PRIMARY KEY,
    session_key text NOT NULL UNIQUE,
    user_id integer REFERENCES users(id) ON DELETE SET NULL,
    free_trial_started_at timestamp,
    free_trial_expires_at timestamp,
    active_pass_expires_at timestamp,
    active_pack_id text,
    interactions_count integer DEFAULT 0 NOT NULL,
    created_at timestamp DEFAULT NOW() NOT NULL,
    updated_at timestamp DEFAULT NOW() NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS dialogue_purchases (
    id serial PRIMARY KEY,
    dialogue_session_id integer NOT NULL REFERENCES dialogue_sessions(id) ON DELETE CASCADE,
    user_id integer REFERENCES users(id) ON DELETE SET NULL,
    pack_id text NOT NULL,
    duration_minutes integer NOT NULL,
    price_eur integer NOT NULL,
    stripe_price_id text NOT NULL,
    stripe_session_id text,
    customer_name text DEFAULT '' NOT NULL,
    customer_email text DEFAULT '' NOT NULL,
    expires_at timestamp NOT NULL,
    created_at timestamp DEFAULT NOW() NOT NULL
  )`,
  // ENN-98 — appunti liberi (tab Appunti), indipendenti dai corsi
  `CREATE TABLE IF NOT EXISTS user_notes (
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title text DEFAULT '' NOT NULL,
    body text DEFAULT '' NOT NULL,
    created_at timestamp DEFAULT NOW() NOT NULL,
    updated_at timestamp DEFAULT NOW() NOT NULL
  )`,
  // --- Legacy ALTER (bases that predate booking Stripe/Calendar columns) ---
  `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS mode text NOT NULL DEFAULT 'remote'`,
  `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS stripe_session_id text`,
  `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS stripe_payment_intent_id text`,
  `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS google_calendar_event_id text`,
  `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS paid_at timestamp`,
  `ALTER TABLE consultation_bookings ADD COLUMN IF NOT EXISTS updated_at timestamp DEFAULT NOW() NOT NULL`,
  // --- Indexes (idempotent) ---
  `CREATE UNIQUE INDEX IF NOT EXISTS dispense_course_module_idx
     ON dispense (course_id, module_number)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS course_purchases_user_course_idx
     ON course_purchases (user_id, course_id)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS dispensa_progress_user_dispensa_idx
     ON dispensa_progress (user_id, dispensa_id)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS consultation_bookings_stripe_session_idx
     ON consultation_bookings (stripe_session_id)
     WHERE stripe_session_id IS NOT NULL`,
  `CREATE UNIQUE INDEX IF NOT EXISTS consultation_bookings_active_slot_idx
     ON consultation_bookings (scheduled_date, scheduled_time)
     WHERE status IN ('pending_payment', 'confirmed')`,
  `CREATE INDEX IF NOT EXISTS user_notes_user_id_idx
     ON user_notes (user_id)`
];
async function ensureBookingSchema() {
  if (!hasDatabaseConfig()) {
    console.error(
      "ensureBookingSchema: skipped (set DATABASE_URL TCP or SQL_HOST)"
    );
    return;
  }
  const pool = createPool();
  for (const sql2 of SCHEMA_BOOTSTRAP_STATEMENTS) {
    try {
      await pool.query(sql2);
    } catch (error) {
      console.error("ensureBookingSchema statement failed:", sql2, error);
      if (isDbConnectionFailure(error)) {
        console.error(
          "ensureBookingSchema: aborting remaining statements (DB unreachable)"
        );
        resetDbPool();
        return;
      }
    }
  }
}
async function ensureSchemaOnce() {
  if (!globalThis._ennamoSchemaReady) {
    globalThis._ennamoSchemaReady = ensureBookingSchema().catch((error) => {
      console.error("ensureBookingSchema failed (non-fatal):", error);
    });
  }
  await globalThis._ennamoSchemaReady;
}

// src/data/courses/arcaniMaggioriDispense.ts
var ARCANI_MAGGIORI_DISPENSE = [
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

// src/db/seedData.ts
var COURSE_SEED_CATALOG = [
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

// src/db/courseCatalog.ts
var seedPromise = null;
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

// src/lib/paymentCatalog.ts
var COURSE_STRIPE_PRICE_ENV = {
  "arcani-maggiori": "STRIPE_PRICE_ID_CORSO_ARCANI_MAGGIORI",
  "arcani-minori": "STRIPE_PRICE_ID_CORSO_ARCANI_MINORI",
  "metodi-stesura": "STRIPE_PRICE_ID_CORSO_METODI_STESURA"
};
function courseStripePriceAnnotation(slug) {
  return COURSE_STRIPE_PRICE_ENV[slug] || `STRIPE_PRICE_ID_CORSO_${slug}`;
}

// src/lib/bookingSlots.ts
var BOOKING_HOUR_START = 9;
var BOOKING_HOUR_END = 20;
var HOUR_SLOTS = Array.from(
  { length: BOOKING_HOUR_END - BOOKING_HOUR_START + 1 },
  (_, i) => `${String(i + BOOKING_HOUR_START).padStart(2, "0")}:00`
);

// src/lib/zohoMail.ts
import nodemailer from "nodemailer";

// src/db/repository.ts
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
var DIALOGUE_PACK_CATALOG = {
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

// src/lib/siteContacts.ts
var SITE_EMAIL = "info@tarotitalia.com";
var SITE_PHONE_DISPLAY = "379 103 82 53";
var SITE_PHONE_E164 = "393791038253";
var SITE_ADDRESS = "Via Crispi 37, 62100 Macerata";
var SITE_PIVA = "02136780430";
var SITE_WHATSAPP_HREF = `https://wa.me/${SITE_PHONE_E164}`;
var SITE_MAPS_QUERY = "Via Francesco Crispi 37, 62100 Macerata, Italia";
var SITE_BUSINESS_QUERY = "Tarot Italia Via Crispi 37 Macerata";
var SITE_MAPS_OPEN_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_MAPS_QUERY)}`;
var SITE_MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SITE_MAPS_QUERY)}`;
var SITE_BUSINESS_PROFILE_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_BUSINESS_QUERY)}`;
var SITE_PARKING_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`parcheggio near ${SITE_MAPS_QUERY}`)}`;
var NEARBY_PARKING = [
  {
    name: "Parcheggio Direzionale",
    address: "Via Giosu\xE8 Carducci 33, 62100 Macerata",
    note: "Il pi\xF9 vicino a Via Crispi \xB7 coperto, H24 \xB7 Impresa Servizi Generali",
    href: "https://parcheggimacerata.it/parcheggio-direzionale",
    latLng: { lat: 43.2972841, lng: 13.4546689 }
  },
  {
    name: "Parcheggio Centro Storico",
    address: "Via Antonio Mugnoz, 62100 Macerata",
    note: "Struttura APM \xB7 collegamento con ascensore al centro storico",
    href: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Parcheggio Centro Storico Via Antonio Mugnoz Macerata")
  },
  {
    name: "Parcheggio Garibaldi",
    address: "Via Augusto Murri, 62100 Macerata",
    note: "Struttura APM \xB7 accessibile da nord, ascensore / scale verso il centro",
    href: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Parcheggio Garibaldi Via Murri Macerata")
  },
  {
    name: "Parcheggio Centrale",
    address: "Via Leopoldo Armaroli 1, 62100 Macerata",
    note: "A pochi minuti a piedi dal centro \xB7 utile se arrivi in auto",
    href: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Parcheggio Centrale Via Leopoldo Armaroli Macerata")
  }
];

// src/lib/dispensaBrandedHtml.ts
function escapeHtml2(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function inlineBold(text2) {
  return escapeHtml2(text2).replace(
    /\*\*([^*]+)\*\*/g,
    "<strong>$1</strong>"
  );
}
function markdownToBrandedBodyHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let inUl = false;
  const closeUl = () => {
    if (inUl) {
      out.push("</ul>");
      inUl = false;
    }
  };
  for (const raw of lines) {
    const line2 = raw.trimEnd();
    const trimmed = line2.trim();
    if (!trimmed) {
      closeUl();
      continue;
    }
    if (/^#{1,4}\s+/.test(trimmed)) {
      closeUl();
      const level = Math.min(trimmed.match(/^#+/)?.[0].length ?? 2, 4);
      const text2 = trimmed.replace(/^#{1,4}\s+/, "");
      out.push(`<h${level}>${inlineBold(text2)}</h${level}>`);
      continue;
    }
    if (/^[-*]\s+/.test(trimmed)) {
      if (!inUl) {
        out.push("<ul>");
        inUl = true;
      }
      out.push(`<li>${inlineBold(trimmed.replace(/^[-*]\s+/, ""))}</li>`);
      continue;
    }
    closeUl();
    out.push(`<p>${inlineBold(trimmed)}</p>`);
  }
  closeUl();
  return out.join("\n");
}
function buildBrandedDispensaHtml(params) {
  const lang = (params.lang || "it").trim() || "it";
  const moduleNumber = params.moduleNumber.padStart(2, "0");
  const courseTitle = params.courseTitle || "Arcani Maggiori";
  const logoSrc = `${params.origin.replace(/\/$/, "")}/brand/tarot-italia-nav.png`;
  const bodyHtml = markdownToBrandedBodyHtml(params.markdown);
  const docTitle = `Tarot Italia \xB7 Modulo ${moduleNumber} \xB7 ${params.title}`;
  const autoPrint = params.autoPrint !== false;
  return `<!DOCTYPE html>
<html lang="${escapeHtml2(lang)}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml2(docTitle)}</title>
  <style>
    :root {
      --gold: #D4AF37;
      --ink: #1a1612;
      --muted: #5c534c;
      --paper: #faf7f2;
    }
    * { box-sizing: border-box; }
    @page {
      size: A4;
      margin: 18mm 14mm 20mm;
    }
    body {
      margin: 0;
      color: var(--ink);
      background: var(--paper);
      font-family: "Source Serif 4", "Noto Serif SC", "Noto Serif", Georgia, "Times New Roman", serif;
      font-size: 11.5pt;
      line-height: 1.55;
    }
    .sheet {
      max-width: 720px;
      margin: 0 auto;
      padding: 1.25rem 1rem 2.5rem;
    }
    .tip {
      margin: 0 0 1rem;
      padding: 0.65rem 0.85rem;
      border: 1px solid rgba(212, 175, 55, 0.45);
      border-radius: 8px;
      background: #fff8e7;
      color: var(--muted);
      font-family: system-ui, sans-serif;
      font-size: 0.85rem;
    }
    header.brand {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      padding-bottom: 0.85rem;
      border-bottom: 2px solid var(--gold);
      margin-bottom: 1.25rem;
    }
    header.brand img {
      width: 56px;
      height: 56px;
      object-fit: contain;
    }
    header.brand .titles { min-width: 0; }
    header.brand .brand-name {
      margin: 0;
      font-size: 1.15rem;
      letter-spacing: 0.04em;
      color: #3a2f1c;
      font-weight: 700;
    }
    header.brand .doc-line {
      margin: 0.2rem 0 0;
      font-size: 0.92rem;
      color: var(--muted);
    }
    h1, h2, h3, h4 {
      color: #2a2218;
      line-height: 1.25;
      page-break-after: avoid;
    }
    h1 { font-size: 1.45rem; margin: 0 0 0.4rem; }
    h2 { font-size: 1.2rem; margin: 1.35rem 0 0.5rem; border-bottom: 1px solid rgba(212,175,55,0.35); padding-bottom: 0.25rem; }
    h3 { font-size: 1.05rem; margin: 1.1rem 0 0.4rem; }
    h4 { font-size: 1rem; margin: 0.9rem 0 0.35rem; }
    p { margin: 0.55rem 0; }
    ul { margin: 0.45rem 0 0.7rem 1.2rem; padding: 0; }
    li { margin: 0.25rem 0; }
    strong { font-weight: 700; }
    footer.brand {
      margin-top: 2rem;
      padding-top: 0.85rem;
      border-top: 1px solid rgba(212, 175, 55, 0.55);
      font-family: system-ui, sans-serif;
      font-size: 0.78rem;
      color: var(--muted);
      line-height: 1.45;
    }
    footer.brand a { color: #6b5520; text-decoration: none; }
    @media print {
      body { background: white; }
      .tip { display: none !important; }
      .sheet { max-width: none; padding: 0; }
      a[href]::after { content: ""; }
    }
  </style>
</head>
<body>
  <div class="sheet">
    <p class="tip">Usa <strong>Salva come PDF</strong> / <strong>Save as PDF</strong> nella finestra di stampa. Lingua: <strong>${escapeHtml2(lang)}</strong>.</p>
    <header class="brand">
      <img src="${escapeHtml2(logoSrc)}" alt="Tarot Italia" width="56" height="56" />
      <div class="titles">
        <p class="brand-name">Tarot Italia \xB7 Maria Teresa Rogani</p>
        <p class="doc-line">${escapeHtml2(courseTitle)} \xB7 Modulo ${escapeHtml2(moduleNumber)}</p>
      </div>
    </header>
    <main>
      <h1>${escapeHtml2(params.title)}</h1>
      ${params.subtitle ? `<p style="color:var(--muted);margin-top:0">${escapeHtml2(params.subtitle)}</p>` : ""}
      ${bodyHtml}
    </main>
    <footer class="brand">
      <div><strong>Tarot Italia</strong> \xB7 ${escapeHtml2(SITE_ADDRESS)}</div>
      <div>
        <a href="mailto:${escapeHtml2(SITE_EMAIL)}">${escapeHtml2(SITE_EMAIL)}</a>
        \xB7 Tel. ${escapeHtml2(SITE_PHONE_DISPLAY)}
        \xB7 P.IVA ${escapeHtml2(SITE_PIVA)}
      </div>
      <div>tarotitalia.com \xB7 Dispensa formativa (traduzione automatica da italiano quando la lingua \u2260 IT)</div>
    </footer>
  </div>
  ${autoPrint ? `<script>
  window.addEventListener('load', function () {
    setTimeout(function () { window.print(); }, 350);
  });
</script>` : ""}
</body>
</html>`;
}
function dispensaPdfFilename(moduleNumber, lang) {
  const nn = moduleNumber.padStart(2, "0");
  const safeLang = (lang || "it").toLowerCase().replace(/[^a-z0-9-]/g, "");
  return `tarot-italia-arcani-maggiori-modulo-${nn}-${safeLang}.pdf`;
}

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

// src/lib/dispensaTranslate.ts
var GROQ_CHAT_ENV_KEY = "TAROTITALIACHATGENERICAGROQ_API_KEY";
var GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
var GROQ_CHAT_DEFAULT_MODEL = "openai/gpt-oss-20b";
var MAX_CHUNK_CHARS = 6e3;
function readGroqApiKey() {
  const raw = process.env[GROQ_CHAT_ENV_KEY];
  if (typeof raw !== "string") return null;
  const key = raw.trim();
  return key.length > 0 ? key : null;
}
function resolveGroqModel() {
  return process.env.GROQ_CHAT_MODEL?.trim() || GROQ_CHAT_DEFAULT_MODEL;
}
function isDispensaTranslateConfigured() {
  return readGroqApiKey() !== null;
}
function splitMarkdownChunks(markdown) {
  const text2 = markdown.trim();
  if (text2.length <= MAX_CHUNK_CHARS) return [text2];
  const parts = [];
  let rest = text2;
  while (rest.length > MAX_CHUNK_CHARS) {
    const window = rest.slice(0, MAX_CHUNK_CHARS);
    const breakAt = Math.max(
      window.lastIndexOf("\n\n"),
      window.lastIndexOf("\n## "),
      window.lastIndexOf("\n### ")
    );
    const cut = breakAt > MAX_CHUNK_CHARS * 0.4 ? breakAt : MAX_CHUNK_CHARS;
    parts.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  if (rest) parts.push(rest);
  return parts;
}
async function groqTranslateChunk(chunk, lang, label) {
  const apiKey = readGroqApiKey();
  if (!apiKey) {
    throw new Error("GROQ_CHAT_UNAVAILABLE");
  }
  const response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: resolveGroqModel(),
      temperature: 0.15,
      max_tokens: 8192,
      stream: false,
      messages: [
        {
          role: "system",
          content: `You are a professional translator for Tarot Italia course handouts.
Translate Italian Markdown into ${label} (\`${lang}\`).
Rules:
- Preserve Markdown structure (# ## ### headings, lists, **bold**, blank lines).
- Keep proper names unchanged: Tarot Italia, Maria Teresa Rogani, Arcani Maggiori, Waite-Smith, Nina, Dialogo Tarot.
- Keep Roman numerals and module numbers (0\u2013XXI, Modulo 01, etc.).
- Do not add commentary, prefaces, or wrap the result in code fences.
- Output ONLY the translated Markdown.`
        },
        { role: "user", content: chunk }
      ]
    })
  });
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  if (!response.ok) {
    console.error(
      "Dispensa Groq translate failed:",
      response.status,
      payload?.error?.message || ""
    );
    throw new Error("GROQ_CHAT_UPSTREAM");
  }
  const reply = payload?.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    throw new Error("GROQ_CHAT_EMPTY");
  }
  return reply;
}
async function translateDispensaMarkdown(italianMarkdown, targetLang) {
  const lang = normalizeNinaLang(targetLang);
  if (isNinaDefaultLang(lang)) {
    return { markdown: italianMarkdown, lang: "it", translated: false };
  }
  const label = ninaReplyLangLabel(lang);
  const chunks = splitMarkdownChunks(italianMarkdown);
  const translatedChunks = [];
  for (const chunk of chunks) {
    translatedChunks.push(await groqTranslateChunk(chunk, lang, label));
  }
  return {
    markdown: translatedChunks.join("\n\n"),
    lang,
    translated: true
  };
}
async function translateDispensaChrome(chrome, targetLang) {
  const lang = normalizeNinaLang(targetLang);
  if (isNinaDefaultLang(lang)) return chrome;
  const label = ninaReplyLangLabel(lang);
  const payload = [
    `TITLE: ${chrome.title}`,
    `SUBTITLE: ${chrome.subtitle || ""}`,
    `COURSE: ${chrome.courseTitle || ""}`
  ].join("\n");
  const reply = await groqTranslateChunk(payload, lang, label);
  const pick = (key, fallback) => {
    const re = new RegExp(`^${key}:\\s*(.*)$`, "im");
    const m = reply.match(re);
    const value = m?.[1]?.trim();
    return value || fallback;
  };
  return {
    title: pick("TITLE", chrome.title),
    subtitle: pick("SUBTITLE", chrome.subtitle),
    courseTitle: pick("COURSE", chrome.courseTitle)
  };
}

// src/lib/maggioriItSource.ts
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

// src/lib/stripDispensaEmbeds.ts
function stripDispensaEmbedMarkers(markdown) {
  return markdown.replace(/^\{\{(?:sigillo|scheda-visiva):[\w-]+\}\}\s*$/gm, "").replace(/\n{3,}/g, "\n\n");
}

// src/lib/maggioriItSource.ts
var MAGGIORI_COURSE_SLUG = "arcani-maggiori";
var MAGGIORI_MODULES = /* @__PURE__ */ new Set(["01", "02", "03", "04"]);
function normalizeMaggioriModule(moduleNumber) {
  return moduleNumber.padStart(2, "0");
}
function maggioriItPublicPath(moduleNumber) {
  const nn = normalizeMaggioriModule(moduleNumber);
  if (!MAGGIORI_MODULES.has(nn)) {
    throw new Error(`Modulo Maggiori non supportato: ${moduleNumber}`);
  }
  return `/dispense/arcani-maggiori/it/modulo-${nn}.md`;
}
function maggioriItAbsoluteUrl(origin, moduleNumber) {
  return `${origin.replace(/\/$/, "")}${maggioriItPublicPath(moduleNumber)}`;
}
function maggioriItFsPath(projectRoot, moduleNumber) {
  const nn = normalizeMaggioriModule(moduleNumber);
  return path.join(
    projectRoot,
    "public",
    "dispense",
    "arcani-maggiori",
    "it",
    `modulo-${nn}.md`
  );
}
function assertMaggioriItSourceUrl(url) {
  const lower = url.toLowerCase();
  if (lower.includes("/dispense/arcani-maggiori/en/")) {
    throw new Error(
      "ENN-154: Maggiori PDF must not load curated EN markdown as source."
    );
  }
  if (lower.includes("/dispense/arcani-maggiori/") && !lower.includes("/dispense/arcani-maggiori/it/")) {
    throw new Error(
      "ENN-154: Maggiori PDF source path must be under .../arcani-maggiori/it/."
    );
  }
}
function readFsItalian(moduleNumber) {
  const nn = normalizeMaggioriModule(moduleNumber);
  if (!MAGGIORI_MODULES.has(nn)) return null;
  const candidates = [
    maggioriItFsPath(process.cwd(), nn),
    // Vercel / bundled cwd may sit under dist — walk up once for public/.
    maggioriItFsPath(path.resolve(process.cwd(), ".."), nn)
  ];
  for (const filePath of candidates) {
    try {
      if (!existsSync(filePath)) continue;
      const text2 = readFileSync(filePath, "utf8").trim();
      if (text2) return text2;
    } catch {
    }
  }
  return null;
}
async function loadMaggioriItalianMarkdown(params) {
  const nn = normalizeMaggioriModule(params.moduleNumber);
  const fromDisk = readFsItalian(nn);
  if (fromDisk) return fromDisk;
  if (MAGGIORI_MODULES.has(nn)) {
    const url = maggioriItAbsoluteUrl(params.origin, nn);
    assertMaggioriItSourceUrl(url);
    try {
      const res = await fetch(url);
      if (res.ok) {
        const text2 = (await res.text()).trim();
        if (text2) return text2;
      }
    } catch (error) {
      console.warn("Maggiori IT markdown fetch failed:", nn, error);
    }
  }
  const fallback = (params.fallbackMarkdown || "").trim();
  if (fallback) return stripDispensaEmbedMarkers(fallback);
  throw new Error("Dispensa non trovata.");
}

// src/lib/stripe.ts
function stripeSecretKey() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key || key.startsWith("MY_") || key.length < 10) {
    return null;
  }
  return key;
}
function isStripeConfigured() {
  return Boolean(stripeSecretKey());
}
function allowDirectUnlock() {
  if (process.env.NODE_ENV === "production") {
    return false;
  }
  return process.env.ALLOW_DIRECT_UNLOCK === "true";
}
function resolveStripePriceId(envOrAnnotation) {
  if (!envOrAnnotation) return null;
  const trimmed = envOrAnnotation.trim();
  if (trimmed.startsWith("price_")) return trimmed;
  const fromEnv = process.env[trimmed]?.trim();
  if (fromEnv && fromEnv.startsWith("price_")) return fromEnv;
  return null;
}
async function createCheckoutSession(params) {
  const stripeKey = stripeSecretKey();
  if (!stripeKey) {
    throw new Error("STRIPE_NOT_CONFIGURED");
  }
  const form = new URLSearchParams();
  form.set("mode", "payment");
  form.set("customer_email", params.customerEmail);
  form.set("success_url", params.successUrl);
  form.set("cancel_url", params.cancelUrl);
  form.set("line_items[0][quantity]", String(params.lineItem.quantity ?? 1));
  if ("priceId" in params.lineItem) {
    form.set("line_items[0][price]", params.lineItem.priceId);
  } else {
    const { priceData } = params.lineItem;
    form.set("line_items[0][price_data][currency]", priceData.currency);
    form.set(
      "line_items[0][price_data][unit_amount]",
      String(priceData.unitAmountCents)
    );
    form.set(
      "line_items[0][price_data][product_data][name]",
      priceData.productName
    );
    if (priceData.productDescription) {
      form.set(
        "line_items[0][price_data][product_data][description]",
        priceData.productDescription
      );
    }
  }
  for (const [key, value] of Object.entries(params.metadata)) {
    if (value != null && value !== "") {
      form.set(`metadata[${key}]`, value);
    }
  }
  const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: form.toString()
  });
  const stripeData = await stripeRes.json();
  if (!stripeRes.ok || !stripeData.id || !stripeData.url) {
    console.error("Stripe checkout session create failed:", stripeData.error);
    throw new Error("STRIPE_CHECKOUT_CREATE_FAILED");
  }
  return { id: stripeData.id, url: stripeData.url };
}
async function retrieveCheckoutSession(sessionId) {
  const stripeKey = stripeSecretKey();
  if (!stripeKey) {
    throw new Error("STRIPE_NOT_CONFIGURED");
  }
  const verifyRes = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    {
      headers: { Authorization: `Bearer ${stripeKey}` }
    }
  );
  const sessionObj = await verifyRes.json();
  if (!verifyRes.ok) {
    console.error("Stripe session retrieve failed:", sessionObj.error);
    throw new Error("STRIPE_SESSION_RETRIEVE_FAILED");
  }
  return sessionObj;
}
async function assertCheckoutPaid(sessionId) {
  const session = await retrieveCheckoutSession(sessionId);
  if (session.payment_status !== "paid") {
    throw new Error("STRIPE_PAYMENT_NOT_PAID");
  }
  return session;
}
function checkoutLineItemFromCatalog(params) {
  const priceId = resolveStripePriceId(params.stripePriceIdAnnotation);
  if (priceId) {
    return { priceId, quantity: 1 };
  }
  return {
    priceData: {
      currency: "eur",
      unitAmountCents: Math.round(params.priceEur * 100),
      productName: params.productName,
      productDescription: params.productDescription
    },
    quantity: 1
  };
}

// src/server/activations.ts
async function activateCourseFromPaidSession(params) {
  const session = await assertCheckoutPaid(params.stripeSessionId);
  const meta = session.metadata || {};
  if (meta.itemType && meta.itemType !== "course") {
    throw new Error("STRIPE_WRONG_ITEM_TYPE");
  }
  const courseSlug = String(
    meta.courseSlug || params.fallbackCourseSlug || ""
  ).trim();
  const customerName = String(
    meta.customerName || params.fallbackCustomerName || params.displayName || "Corsista"
  ).trim();
  const customerPhone = meta.customerPhone ? String(meta.customerPhone).trim() : params.fallbackCustomerPhone;
  if (!courseSlug) {
    throw new Error("Metadati pagamento incompleti.");
  }
  return enrollUserInCourse({
    uid: params.uid,
    email: params.email,
    displayName: params.displayName,
    courseSlug,
    customerName,
    customerPhone,
    stripeSessionId: params.stripeSessionId
  });
}

// src/server/http.ts
var SAFE_CLIENT_ERRORS = /* @__PURE__ */ new Set([
  "Percorso didattico non trovato.",
  "Dispensa non trovata.",
  "Acquisto richiesto per accedere a questa dispensa.",
  "Tariffa consulto non valida.",
  "Pacchetto temporale non valido.",
  "Pagamento Stripe richiesto per attivare il percorso.",
  "Pagamento Stripe richiesto per attivare il pass.",
  "SLOT_TAKEN",
  "Prenotazione non trovata.",
  "Prenotazione annullata.",
  "Appunto non trovato."
]);
function json2(status, body) {
  return { status, body };
}
function mapSafeError(error, fallback, statusHints) {
  const msg = error instanceof Error ? error.message : "";
  if (statusHints?.notFound && msg.includes(statusHints.notFound)) {
    return json2(404, { error: msg });
  }
  if (statusHints?.forbidden && msg.includes(statusHints.forbidden)) {
    return json2(403, { error: msg });
  }
  if (statusHints?.paymentRequired && msg.includes(statusHints.paymentRequired)) {
    return json2(402, { error: msg });
  }
  if (SAFE_CLIENT_ERRORS.has(msg)) {
    const status = msg.includes("non trov") ? 404 : msg.includes("richiesto") ? 402 : 400;
    return json2(status, { error: msg });
  }
  console.error(fallback, error);
  return json2(500, { error: fallback });
}

// src/server/routes/reserved.ts
var MAGGIORI_SLUG = MAGGIORI_COURSE_SLUG;
var DEMO_RESERVED_UID = "demo-reserved-enn103";
var DEMO_RESERVED_TOKEN = "demo-reserved-token";
function isDevDemoReservedAuth(authorization) {
  if (!authorization || !authorization.startsWith("Bearer ")) return false;
  const token = authorization.slice("Bearer ".length).trim();
  if (token !== DEMO_RESERVED_TOKEN) return false;
  return process.env.NODE_ENV !== "production" || process.env.ALLOW_DIRECT_UNLOCK === "true";
}
var OVERVIEW_DEGRADED_NOTICE = "Area Riservata in modalit\xE0 ridotta: non riusciamo a sincronizzare corsi e prenotazioni con il database in questo momento. Puoi restare autenticata; riprova tra poco.";
function degradedOverviewFromSeed(user) {
  return {
    user: {
      id: 0,
      uid: user.uid,
      email: user.email || "",
      displayName: user.name ?? null,
      phoneWhatsapp: null
    },
    courses: COURSE_SEED_CATALOG.map((course, index2) => ({
      id: -(index2 + 1),
      slug: course.slug,
      title: course.title,
      subtitle: course.subtitle,
      description: course.description,
      priceEur: course.priceEur,
      stripePriceId: course.stripePriceId,
      lessonsCount: course.lessonsCount,
      totalHours: course.totalHours,
      levelLabel: course.levelLabel,
      sortOrder: course.sortOrder,
      isUnlocked: false,
      purchasedAt: null,
      amountPaidEur: null,
      dispenseCount: course.dispense.length,
      dispenseOutline: course.dispense.map((d, i) => ({
        id: -(index2 * 100 + i + 1),
        courseId: -(index2 + 1),
        moduleNumber: d.moduleNumber,
        title: d.title,
        subtitle: d.subtitle,
        format: d.format,
        readingMinutes: d.readingMinutes,
        sortOrder: i + 1
      })),
      unlockedDispense: []
    })),
    bookings: [],
    dialoguePasses: [],
    degraded: true,
    notice: OVERVIEW_DEGRADED_NOTICE
  };
}
async function getReservedOverview(user) {
  try {
    if (!user.uid) {
      return json2(401, { error: "Identit\xE0 utente non valida.", code: "AUTH_INVALID" });
    }
    try {
      const overview = await getReservedAreaOverview(
        user.uid,
        user.email || "",
        user.name ?? null
      );
      return json2(200, overview);
    } catch (error) {
      console.error("getReservedOverview soft-fail (seed catalog):", error);
      return json2(200, {
        ...degradedOverviewFromSeed(user),
        detail: error instanceof Error ? error.message : String(error),
        code: "OVERVIEW_DEGRADED"
      });
    }
  } catch (error) {
    return mapSafeError(error, "Impossibile aprire l\u2019Area Riservata.");
  }
}
async function postReservedEnroll(params) {
  try {
    const { user, body, origin } = params;
    const email = user.email || String(body.email || "");
    const displayName = user.name ?? null;
    if (!user.uid || !email) {
      return json2(401, { error: "Autenticazione richiesta." });
    }
    const courseSlug = String(body.courseSlug || "").trim();
    const customerName = String(
      body.customerName || displayName || ""
    ).trim();
    const customerPhone = body.customerPhone ? String(body.customerPhone).trim() : void 0;
    const stripeSessionId = body.stripeSessionId ? String(body.stripeSessionId).trim() : "";
    if (!courseSlug || !customerName) {
      return json2(400, {
        error: "Dati del percorso o nominativo mancanti."
      });
    }
    const course = await findCourseBySlug(courseSlug);
    if (!course) {
      return json2(404, { error: "Percorso didattico non trovato." });
    }
    if (stripeSessionId) {
      const result = await activateCourseFromPaidSession({
        uid: user.uid,
        email,
        displayName,
        stripeSessionId,
        fallbackCourseSlug: courseSlug,
        fallbackCustomerName: customerName,
        fallbackCustomerPhone: customerPhone
      });
      return json2(201, { mode: "enrolled", ...result });
    }
    if (isStripeConfigured()) {
      const priceAnnotation = course.stripePriceId || courseStripePriceAnnotation(course.slug);
      const checkout = await createCheckoutSession({
        customerEmail: email,
        successUrl: `${origin}/area-riservata?course_stripe_session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${origin}/area-riservata?checkout=cancel&item=course`,
        lineItem: checkoutLineItemFromCatalog({
          stripePriceIdAnnotation: priceAnnotation,
          priceEur: course.priceEur,
          productName: `Tarot Italia \xB7 ${course.title}`,
          productDescription: course.subtitle
        }),
        metadata: {
          itemType: "course",
          courseSlug: course.slug,
          customerName,
          customerEmail: email,
          customerPhone: customerPhone || "",
          firebaseUserId: user.uid
        }
      });
      return json2(200, {
        mode: "stripe_redirect",
        checkoutUrl: checkout.url,
        stripeSessionId: checkout.id
      });
    }
    if (allowDirectUnlock()) {
      const result = await enrollUserInCourse({
        uid: user.uid,
        email,
        displayName,
        courseSlug,
        customerName,
        customerPhone,
        stripeSessionId: `cs_dev_course_${course.slug}_${Date.now()}`
      });
      return json2(201, { mode: "direct_unlock", ...result });
    }
    return json2(503, {
      error: "Pagamenti Stripe non configurati. Imposta STRIPE_SECRET_KEY (e i Price ID) oppure, solo in sviluppo, ALLOW_DIRECT_UNLOCK=true."
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "";
    if (msg === "STRIPE_PAYMENT_NOT_PAID") {
      return json2(402, { error: "Pagamento Stripe non ancora confermato." });
    }
    if (msg === "Metadati pagamento incompleti." || msg === "STRIPE_WRONG_ITEM_TYPE") {
      return json2(400, { error: "Metadati pagamento incompleti." });
    }
    return mapSafeError(error, "Errore nella registrazione del percorso.", {
      notFound: "non trovato"
    });
  }
}
async function postReservedConfirmStripe(params) {
  try {
    const { user, body } = params;
    const email = user.email || "";
    const stripeSessionId = String(body.stripeSessionId || "").trim();
    if (!user.uid || !email) {
      return json2(401, { error: "Autenticazione richiesta." });
    }
    if (!stripeSessionId || !isStripeConfigured()) {
      return json2(400, { error: "Sessione Stripe non verificabile." });
    }
    const result = await activateCourseFromPaidSession({
      uid: user.uid,
      email,
      displayName: user.name ?? null,
      stripeSessionId
    });
    return json2(200, { mode: "enrolled", ...result });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "";
    if (msg === "STRIPE_PAYMENT_NOT_PAID") {
      return json2(402, { error: "Pagamento Stripe non ancora confermato." });
    }
    return mapSafeError(error, "Errore nella verifica del pagamento corso.");
  }
}
async function putDispensaProgress(params) {
  try {
    const { user, dispensaId, body } = params;
    if (!user.uid) {
      return json2(401, { error: "Autenticazione richiesta." });
    }
    if (!Number.isInteger(dispensaId) || dispensaId <= 0) {
      return json2(400, { error: "Identificativo dispensa non valido." });
    }
    const completed = typeof body.completed === "boolean" ? body.completed : void 0;
    const personalNotes = typeof body.personalNotes === "string" ? body.personalNotes : void 0;
    const updated = await updateDispensaProgress({
      uid: user.uid,
      email: user.email || "",
      dispensaId,
      completed,
      personalNotes
    });
    return json2(200, { progress: updated });
  } catch (error) {
    return mapSafeError(error, "Errore nel salvataggio del progresso.", {
      notFound: "non trovata",
      forbidden: "Acquisto richiesto"
    });
  }
}
async function getDispensaPdf(params) {
  try {
    const { dispensaId, origin } = params;
    if (!Number.isInteger(dispensaId) || dispensaId <= 0) {
      return json2(400, { error: "Identificativo dispensa non valido." });
    }
    const rows = await db.select({
      id: dispense.id,
      courseId: dispense.courseId,
      moduleNumber: dispense.moduleNumber,
      title: dispense.title,
      subtitle: dispense.subtitle,
      contentMarkdown: dispense.contentMarkdown,
      courseSlug: courses.slug,
      courseTitle: courses.title
    }).from(dispense).innerJoin(courses, eq(courses.id, dispense.courseId)).where(eq(dispense.id, dispensaId)).limit(1);
    const row = rows[0];
    if (!row) {
      return json2(404, { error: "Dispensa non trovata." });
    }
    if (!params.demoBypass) {
      const user = params.user;
      if (!user?.uid) {
        return json2(401, { error: "Autenticazione richiesta." });
      }
      if (user.uid === DEMO_RESERVED_UID) {
        return json2(403, {
          error: "Acquisto richiesto per accedere a questa dispensa."
        });
      }
      const dbUser = await getOrCreateUser(
        user.uid,
        user.email || "",
        user.name ?? null
      );
      const purchaseRows = await db.select({ id: coursePurchases.id }).from(coursePurchases).where(
        and(
          eq(coursePurchases.userId, dbUser.id),
          eq(coursePurchases.courseId, row.courseId),
          eq(coursePurchases.status, "active")
        )
      ).limit(1);
      if (!purchaseRows[0]) {
        return json2(403, {
          error: "Acquisto richiesto per accedere a questa dispensa."
        });
      }
    }
    const lang = normalizeNinaLang(params.lang);
    if (!isNinaDefaultLang(lang) && !isDispensaTranslateConfigured()) {
      return json2(503, {
        error: "Traduzione PDF non disponibile: manca TAROTITALIACHATGENERICAGROQ_API_KEY.",
        code: "DISPENSA_PDF_TRANSLATE_UNAVAILABLE"
      });
    }
    let italianMarkdown;
    if (row.courseSlug === MAGGIORI_SLUG) {
      italianMarkdown = await loadMaggioriItalianMarkdown({
        moduleNumber: row.moduleNumber,
        origin,
        fallbackMarkdown: row.contentMarkdown
      });
    } else {
      italianMarkdown = stripDispensaEmbedMarkers(row.contentMarkdown);
    }
    let markdown = italianMarkdown;
    let outLang = "it";
    let translated = false;
    let title = row.title;
    let subtitle = row.subtitle || "";
    let courseTitle = row.courseTitle;
    try {
      const result = await translateDispensaMarkdown(italianMarkdown, lang);
      markdown = result.markdown;
      outLang = result.lang;
      translated = result.translated;
      if (translated) {
        const chrome = await translateDispensaChrome(
          {
            title: row.title,
            subtitle: row.subtitle || "",
            courseTitle: row.courseTitle
          },
          lang
        );
        title = chrome.title;
        subtitle = chrome.subtitle;
        courseTitle = chrome.courseTitle;
      }
    } catch (error) {
      const code = error instanceof Error ? error.message : "GROQ_CHAT_UPSTREAM";
      console.error("Dispensa PDF translate failed:", code);
      return json2(503, {
        error: "Traduzione della dispensa non riuscita. Riprova tra poco.",
        code: "DISPENSA_PDF_TRANSLATE_FAILED",
        detail: code
      });
    }
    const html = buildBrandedDispensaHtml({
      markdown,
      lang: outLang,
      moduleNumber: row.moduleNumber,
      title,
      subtitle,
      courseTitle,
      origin,
      autoPrint: true
    });
    return json2(200, {
      html,
      lang: outLang,
      translated,
      filename: dispensaPdfFilename(row.moduleNumber, outLang),
      moduleNumber: row.moduleNumber,
      title,
      courseSlug: row.courseSlug,
      sourceLang: "it"
    });
  } catch (error) {
    return mapSafeError(error, "Impossibile generare il PDF della dispensa.", {
      notFound: "non trovata",
      forbidden: "Acquisto richiesto"
    });
  }
}
async function getUserNotes(user) {
  try {
    if (!user.uid) {
      return json2(401, { error: "Autenticazione richiesta." });
    }
    const notes = await listUserNotes({
      uid: user.uid,
      email: user.email || "",
      displayName: user.name ?? null
    });
    return json2(200, { notes });
  } catch (error) {
    return mapSafeError(error, "Impossibile caricare gli appunti.");
  }
}
async function postUserNote(params) {
  try {
    const { user, body } = params;
    if (!user.uid) {
      return json2(401, { error: "Autenticazione richiesta." });
    }
    const note = await createUserNote({
      uid: user.uid,
      email: user.email || "",
      displayName: user.name ?? null,
      title: typeof body.title === "string" ? body.title : void 0,
      body: typeof body.body === "string" ? body.body : void 0
    });
    return json2(201, { note });
  } catch (error) {
    return mapSafeError(error, "Impossibile creare l\u2019appunto.");
  }
}
async function putUserNote(params) {
  try {
    const { user, noteId, body } = params;
    if (!user.uid) {
      return json2(401, { error: "Autenticazione richiesta." });
    }
    if (!Number.isInteger(noteId) || noteId <= 0) {
      return json2(400, { error: "Identificativo appunto non valido." });
    }
    const note = await updateUserNote({
      uid: user.uid,
      email: user.email || "",
      noteId,
      title: typeof body.title === "string" ? body.title : void 0,
      body: typeof body.body === "string" ? body.body : void 0
    });
    return json2(200, { note });
  } catch (error) {
    return mapSafeError(error, "Impossibile salvare l\u2019appunto.", {
      notFound: "non trovato"
    });
  }
}
async function deleteUserNoteRoute(params) {
  try {
    const { user, noteId } = params;
    if (!user.uid) {
      return json2(401, { error: "Autenticazione richiesta." });
    }
    if (!Number.isInteger(noteId) || noteId <= 0) {
      return json2(400, { error: "Identificativo appunto non valido." });
    }
    const result = await deleteUserNote({
      uid: user.uid,
      email: user.email || "",
      noteId
    });
    return json2(200, result);
  } catch (error) {
    return mapSafeError(error, "Impossibile eliminare l\u2019appunto.", {
      notFound: "non trovato"
    });
  }
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
function readHeader(req, name) {
  const target = name.toLowerCase();
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (key.toLowerCase() !== target) continue;
    return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
  }
  return "";
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
function queryString(value) {
  if (Array.isArray(value)) return String(value[0] || "");
  return String(value || "");
}
function requestOrigin(req) {
  const proto = readHeader(req, "x-forwarded-proto") || "https";
  const host = readHeader(req, "x-forwarded-host") || readHeader(req, "host");
  if (host) {
    return `${proto}://${host}`.replace(/\/$/, "");
  }
  const origin = readHeader(req, "origin");
  if (origin) return origin.replace(/\/$/, "");
  return (process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
}

// src/server/vercelEntry.ts
function groupSubpath(req, prefix) {
  const fromQuery = req.query?.__path;
  if (typeof fromQuery === "string" && fromQuery.trim()) {
    return fromQuery.replace(/^\/+|\/+$/g, "");
  }
  if (Array.isArray(fromQuery) && fromQuery[0]) {
    return String(fromQuery[0]).replace(/^\/+|\/+$/g, "");
  }
  const headerPath = (typeof req.headers?.["x-forwarded-uri"] === "string" ? req.headers["x-forwarded-uri"] : void 0) || (typeof req.headers?.["x-invoke-path"] === "string" ? req.headers["x-invoke-path"] : void 0) || (typeof req.headers?.["x-matched-path"] === "string" ? req.headers["x-matched-path"] : void 0);
  const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  for (const raw of [headerPath, req.url, ""]) {
    if (!raw) continue;
    const pathname = String(raw).split("?")[0] || "";
    const cleaned = pathname.replace(new RegExp(`^/?api/${escaped}/?`, "i"), "").replace(new RegExp(`^/?api/${escaped}$`, "i"), "").replace(/^\/+|\/+$/g, "");
    if (cleaned && cleaned !== prefix) return cleaned;
  }
  return "";
}

// src/server/apiEntries/reserved.ts
var config = { runtime: "nodejs", maxDuration: 60 };
function methodNotAllowed(res, allowed) {
  res.setHeader("Allow", allowed.join(", "));
  sendJson(res, 405, { error: "Metodo non consentito.", allow: allowed });
}
async function requireUser(req, res) {
  const authHeader = (() => {
    for (const [key, value] of Object.entries(req.headers || {})) {
      if (key.toLowerCase() !== "authorization") continue;
      return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
    }
    return "";
  })();
  const auth2 = await verifyBearerToken(authHeader || void 0, "required");
  if (!auth2.ok) {
    sendJson(res, auth2.status, {
      error: auth2.error,
      code: "AUTH_REQUIRED"
    });
    return null;
  }
  return auth2.user;
}
async function handler(req, res) {
  try {
    const method = (req.method || "GET").toUpperCase();
    const path2 = groupSubpath(req, "reserved");
    await ensureSchemaOnce();
    if (path2 === "overview") {
      if (method !== "GET") return methodNotAllowed(res, ["GET"]);
      const user = await requireUser(req, res);
      if (!user) return;
      res.setHeader("Cache-Control", "private, no-store");
      const result = await getReservedOverview(user);
      return sendJson(res, result.status, result.body);
    }
    if (path2 === "enroll") {
      if (method !== "POST") return methodNotAllowed(res, ["POST"]);
      const user = await requireUser(req, res);
      if (!user) return;
      const result = await postReservedEnroll({
        user,
        body: readBodyObject(req),
        origin: requestOrigin(req)
      });
      return sendJson(res, result.status, result.body);
    }
    if (path2 === "confirm-stripe") {
      if (method !== "POST") return methodNotAllowed(res, ["POST"]);
      const user = await requireUser(req, res);
      if (!user) return;
      const result = await postReservedConfirmStripe({
        user,
        body: readBodyObject(req)
      });
      return sendJson(res, result.status, result.body);
    }
    const dispensaPdf = path2.match(/^dispense\/([^/]+)\/pdf$/);
    if (dispensaPdf) {
      if (method !== "GET") return methodNotAllowed(res, ["GET"]);
      const demoBypass = isDevDemoReservedAuth(
        (() => {
          for (const [key, value] of Object.entries(req.headers || {})) {
            if (key.toLowerCase() !== "authorization") continue;
            return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
          }
          return "";
        })()
      );
      let user = null;
      if (!demoBypass) {
        user = await requireUser(req, res);
        if (!user) return;
      }
      const langRaw = queryString(req.query?.lang) || null;
      res.setHeader("Cache-Control", "private, no-store");
      const result = await getDispensaPdf({
        user,
        dispensaId: Number(dispensaPdf[1]),
        lang: langRaw,
        origin: requestOrigin(req),
        demoBypass
      });
      return sendJson(res, result.status, result.body);
    }
    const dispensaProgress2 = path2.match(/^dispense\/([^/]+)\/progress$/);
    if (dispensaProgress2) {
      if (method !== "PUT") return methodNotAllowed(res, ["PUT"]);
      const user = await requireUser(req, res);
      if (!user) return;
      const result = await putDispensaProgress({
        user,
        dispensaId: Number(dispensaProgress2[1]),
        body: readBodyObject(req)
      });
      return sendJson(res, result.status, result.body);
    }
    if (path2 === "notes") {
      if (method === "GET") {
        const user = await requireUser(req, res);
        if (!user) return;
        res.setHeader("Cache-Control", "private, no-store");
        const result = await getUserNotes(user);
        return sendJson(res, result.status, result.body);
      }
      if (method === "POST") {
        const user = await requireUser(req, res);
        if (!user) return;
        const result = await postUserNote({
          user,
          body: readBodyObject(req)
        });
        return sendJson(res, result.status, result.body);
      }
      return methodNotAllowed(res, ["GET", "POST"]);
    }
    const noteById = path2.match(/^notes\/([^/]+)$/);
    if (noteById) {
      const noteId = Number(noteById[1]);
      if (method === "PUT") {
        const user = await requireUser(req, res);
        if (!user) return;
        const result = await putUserNote({
          user,
          noteId,
          body: readBodyObject(req)
        });
        return sendJson(res, result.status, result.body);
      }
      if (method === "DELETE") {
        const user = await requireUser(req, res);
        if (!user) return;
        const result = await deleteUserNoteRoute({ user, noteId });
        return sendJson(res, result.status, result.body);
      }
      return methodNotAllowed(res, ["PUT", "DELETE"]);
    }
    return sendJson(res, 404, { error: "Not found", path: path2, method });
  } catch (error) {
    console.error("api/reserved handler failed:", error);
    return sendJson(res, 500, {
      error: "Impossibile aprire l\u2019Area Riservata.",
      code: "RESERVED_HANDLER_FAILED",
      detail: error instanceof Error ? error.message : String(error)
    });
  }
}
export {
  config,
  handler as default
};
