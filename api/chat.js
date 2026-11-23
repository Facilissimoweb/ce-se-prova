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

// src/data/consultationTariffs.ts
function joinTariffDescription(paragraphs) {
  return paragraphs.map((p) => p.trim()).filter(Boolean).join(" ");
}
function tariffWithParagraphs(base) {
  return {
    ...base,
    description: joinTariffDescription(base.descriptionParagraphs)
  };
}
function consultTariffModality(tariff) {
  if (tariff.onlineOnly) return "solo online (chiamata vocale WhatsApp)";
  return "vocale o Studio Macerata (Via Crispi 37)";
}
function formatConsultTariffsMarkdownList() {
  return consultationTariffs.map((t) => {
    const badge = t.recommended ? " \xB7 **Il pi\xF9 scelto**" : "";
    return `- **${t.title}** \xB7 ${t.durationMinutes} min \xB7 **\u20AC${t.priceEur}** \xB7 ${consultTariffModality(t)}${badge}`;
  }).join("\n");
}
function formatConsultTariffsMarkdownDetails() {
  return consultationTariffs.map((t) => {
    const includes = t.includes.map((item) => item).join("; ");
    return `- **${t.title}**: ${t.description} Include: ${includes}.`;
  }).join("\n");
}
var consultationTariffs;
var init_consultationTariffs = __esm({
  "src/data/consultationTariffs.ts"() {
    consultationTariffs = [
      tariffWithParagraphs({
        id: "20m",
        durationMinutes: 20,
        priceEur: 22,
        stripePriceIdAnnotation: "STRIPE_PRICE_ID_CONSULTO_20M",
        cmsKeyTitle: "[COPY: tariffa.placeholder.0.title]",
        title: "Consulto Breve",
        cmsKeyDesc: "[COPY: tariffa.placeholder.0.desc]",
        descriptionParagraphs: [
          "Una domanda precisa, una lettura mirata, chiarezza immediata.",
          "Quando hai un dubbio puntuale che richiede attenzione \u2014 su una relazione, su un\u2019attesa o su una scelta vicina \u2014 e desideri comprendere con lucidit\xE0 cosa si sta muovendo prima di agire."
        ],
        cmsKeyFocus: "[COPY: tariffa.placeholder.0.focus]",
        focusLabel: "Solo chiamata vocale WhatsApp",
        onlineOnly: true,
        includes: [
          "Ci concentriamo su un unico tema attraverso i 78 Arcani, andando all\u2019essenza con ascolto e precisione",
          "Dopo: una visione chiara della situazione e 2\u20133 indicazioni pratiche via WhatsApp o email",
          "Indicato se desideri fare luce su una singola questione in modo rapido e accessibile (non adatto a pi\xF9 temi insieme)"
        ]
      }),
      tariffWithParagraphs({
        id: "45m",
        durationMinutes: 45,
        priceEur: 49,
        stripePriceIdAnnotation: "STRIPE_PRICE_ID_CONSULTO_45M",
        cmsKeyTitle: "[COPY: tariffa.placeholder.1.title]",
        title: "Consulto Essenziale",
        cmsKeyDesc: "[COPY: tariffa.placeholder.1.desc]",
        descriptionParagraphs: [
          "Per fare ordine quando hai due o tre questioni aperte e vuoi orientare bene le tue energie.",
          "Quando una risposta veloce non basta perch\xE9 gli ambiti coinvolti sono pi\xF9 d\u2019uno \u2014 ad esempio affetti e lavoro, oppure una decisione importante da prendere con equilibrio e senza fretta."
        ],
        cmsKeyFocus: "[COPY: tariffa.placeholder.1.focus]",
        focusLabel: "Vocale o Studio Macerata (Via Crispi 37)",
        includes: [
          "Osserviamo le situazioni collegate tra loro, mettendo a fuoco dinamiche, ostacoli e possibilit\xE0 concrete del presente",
          "Dopo: una sintesi scritta dei punti principali emersi, da rileggere con calma",
          "Indicato se cerchi chiarezza concreta su pi\xF9 aspetti della quotidianit\xE0 in un tempo raccolto ed equilibrato"
        ]
      }),
      tariffWithParagraphs({
        id: "60m",
        durationMinutes: 60,
        priceEur: 79,
        stripePriceIdAnnotation: "STRIPE_PRICE_ID_CONSULTO_60M",
        cmsKeyTitle: "[COPY: tariffa.placeholder.2.title]",
        title: "Consulto Evolutivo Completo",
        cmsKeyDesc: "[COPY: tariffa.placeholder.2.desc]",
        descriptionParagraphs: [
          "Per comprendere le radici di ci\xF2 che vivi e ritrovare una direzione consapevole.",
          "Quando avverti che una dinamica si ripete \u2014 nelle relazioni, nel percorso professionale o nelle scelte personali \u2014 e desideri osservare con onest\xE0 sia il contesto esterno sia il tuo spazio di azione."
        ],
        cmsKeyFocus: "[COPY: tariffa.placeholder.2.focus]",
        focusLabel: "Il pi\xF9 scelto \xB7 Vocale o Studio Macerata",
        includes: [
          "Un\u2019ora intera, senza fretta, per approfondire le cause profonde, riconoscere i punti ciechi e individuare le strade pi\xF9 autentiche",
          "Dopo: una sintesi della lettura insieme a tracce di riflessione pratiche per le settimane successive",
          "Indicato se desideri una lettura profonda e rispettosa che ti accompagni a scegliere con consapevolezza e autonomia"
        ],
        recommended: true
      }),
      tariffWithParagraphs({
        id: "90m",
        durationMinutes: 90,
        priceEur: 99,
        stripePriceIdAnnotation: "STRIPE_PRICE_ID_CONSULTO_90M",
        cmsKeyTitle: "[COPY: tariffa.placeholder.3.title]",
        title: "Sessione Integrata",
        cmsKeyDesc: "[COPY: tariffa.placeholder.3.desc]",
        descriptionParagraphs: [
          "Un\u2019ora e mezza dedicata a rimettere insieme tutti i fili e guardare con respiro al percorso che ti attende.",
          "Ideale quando stai chiudendo una fase impegnativa, iniziando un nuovo capitolo o senti il bisogno di esplorare insieme relazioni, lavoro, risorse personali e direzione generale senza frammentare il lavoro."
        ],
        cmsKeyFocus: "[COPY: tariffa.placeholder.3.focus]",
        focusLabel: "Vocale o Studio Macerata (Via Crispi 37)",
        includes: [
          "Un incontro ampio e approfondito che abbraccia pi\xF9 ambiti della vita e definisce le priorit\xE0 dei prossimi mesi",
          "Dopo: riscontro scritto entro 48 ore su un canale riservato, per fissare i passaggi chiave a mente serena",
          "Indicato se desideri un lavoro completo in un unico spazio dedicato, con il miglior equilibrio tra tempo, profondit\xE0 e investimento"
        ]
      })
    ];
  }
});

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
        description: "I 22 Trionfi da 0 a XXI: dispense, schede Waite-Smith, Sigillo \u2014 e Nina Studio (chat riservata di studio) inclusa a vita.",
        priceEur: 69,
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
    init_consultationTariffs();
    BOOKING_TARIFF_CATALOG = Object.fromEntries(
      consultationTariffs.map((t) => [
        t.id,
        {
          id: t.id,
          title: t.title,
          durationMinutes: t.durationMinutes,
          priceEur: t.priceEur,
          stripePriceIdAnnotation: t.stripePriceIdAnnotation,
          ...t.onlineOnly ? { onlineOnly: true } : {}
        }
      ])
    );
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

// src/lib/coursePresentation.ts
function isCourseSlugPubliclyPresented(slug) {
  const flagged = COURSE_PUBLIC_PRESENTED[slug];
  return flagged !== false;
}
function filterPublicPresentedBySlug(courses2) {
  return courses2.filter((c) => isCourseSlugPubliclyPresented(c.slug));
}
var COURSE_PUBLIC_PRESENTED;
var init_coursePresentation = __esm({
  "src/lib/coursePresentation.ts"() {
    COURSE_PUBLIC_PRESENTED = {
      "arcani-minori": false,
      "metodi-stesura": false
    };
  }
});

// src/lib/maggioriPurchaseMode.ts
var MAGGIORI_PURCHASE_COURSE_SLUG;
var init_maggioriPurchaseMode = __esm({
  "src/lib/maggioriPurchaseMode.ts"() {
    MAGGIORI_PURCHASE_COURSE_SLUG = "arcani-maggiori";
  }
});

// src/lib/ownerCourseAccess.ts
function parseOwnerEmailExtras(raw) {
  if (!raw?.trim()) return [];
  return raw.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function isOwnerCourseAccessEmail(email, env = process.env) {
  const normalized = (email || "").trim().toLowerCase();
  if (!normalized) return false;
  if (OWNER_COURSE_ACCESS_EMAILS.includes(normalized)) {
    return true;
  }
  return parseOwnerEmailExtras(env.COMING_SOON_OWNER_EMAILS).includes(
    normalized
  );
}
function ownerHasComplimentaryCourseAccess(email, courseSlug, env = process.env) {
  return isOwnerCourseAccessEmail(email, env) && courseSlug === MAGGIORI_PURCHASE_COURSE_SLUG;
}
var OWNER_COURSE_ACCESS_EMAILS;
var init_ownerCourseAccess = __esm({
  "src/lib/ownerCourseAccess.ts"() {
    init_maggioriPurchaseMode();
    OWNER_COURSE_ACCESS_EMAILS = [
      "mariateresarogani@gmail.com"
    ];
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
    const ownerMaggioriUnlock = isOwnerCourseAccessEmail(email);
    const maggioriCourse = ownerMaggioriUnlock ? allCourses.find((c) => c.slug === MAGGIORI_PURCHASE_COURSE_SLUG) : null;
    const unlockedCourseIds = Array.from(
      /* @__PURE__ */ new Set([
        ...userPurchases.map((p) => p.courseId),
        ...maggioriCourse ? [maggioriCourse.id] : []
      ])
    );
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
      // ENN-175 — Maggiori-only in Area Personale (same publicPresented flag).
      courses: filterPublicPresentedBySlug(
        allCourses.map((course) => {
          const purchase = userPurchases.find((p) => p.courseId === course.id);
          const isUnlocked = Boolean(purchase) || ownerHasComplimentaryCourseAccess(email, course.slug);
          const outline = allOutlineDispense.filter(
            (d) => d.courseId === course.id
          );
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
        })
      ),
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
  if (ownerHasComplimentaryCourseAccess(params.email, params.courseSlug)) {
    return true;
  }
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
    const courseRows = await db.select({ slug: courses.slug }).from(courses).where(eq(courses.id, targetDispensa.courseId)).limit(1);
    const courseSlug = courseRows[0]?.slug ?? "";
    const ownerBypass = ownerHasComplimentaryCourseAccess(
      params.email,
      courseSlug
    );
    if (!ownerBypass) {
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
    init_coursePresentation();
    init_googleCalendar();
    init_ownerCourseAccess();
    init_maggioriPurchaseMode();
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

// src/lib/groqChat.ts
init_consultationTariffs();

// src/lib/ninaChatKnowledge.ts
init_consultationTariffs();

// src/data/ninaBlogPosts.generated.ts
var NINA_BLOG_CATALOG = [
  {
    "title": "La Giustizia: l'equilibrio, la responsabilit\xE0 e il mistero della numerazione",
    "category": "A. Maggiori",
    "gated": false,
    "cite": "/news/Giustizia Articolo",
    "summary": "Un'analisi approfondita della carta della Giustizia tra equilibrio interiore, conseguenza delle azioni e il passaggio numerico tra VIII e XI nelle diverse tradizioni tarologiche."
  },
  {
    "title": "Pamela Colman Smith: l'artista visionaria dietro i Tarocchi pi\xF9 famosi al mondo",
    "category": "Autori",
    "gated": false,
    "cite": "/news/pamela-colman-smith-artista",
    "summary": "Biografia di Pamela Colman Smith (Pixie): Golden Dawn, sinestesia e la rivoluzione visiva del mazzo Rider-Waite-Smith del 1909."
  },
  {
    "title": "Il Coraggio di Iniziare: Il Matto (0) e la Magia dello Sguardo Rivolto verso l'Alto",
    "category": "A. Maggiori",
    "gated": true,
    "cite": "/news/il-coraggio-di-iniziare-il-matto",
    "summary": "Dallo slancio incontaminato della spinta originaria alla visione dei Tre Settenari \u2014 guida pratica all'archetipo della libert\xE0, della gioia e del salto fiducioso nell'ignoto. Introduzione pubblica; approfondimento riserv"
  },
  {
    "title": "Il Bagatto / Il Mago (I): La Scintilla del Talento e la Maestria di Canalizzare l'Infinito nella Realt\xE0",
    "category": "A. Maggiori",
    "gated": true,
    "cite": "/news/la-scintilla-del-talento-il-bagatto",
    "summary": "Un viaggio profondo e viscerale nell'Arcano I, Il Bagatto (Il Mago): iconografia Waite-Smith, forza creatrice, ombre del talento e arte di incarnare l'infinito nella vita concreta. Introduzione pubblica; approfondimento "
  },
  {
    "title": "L'origine segreta del mazzo Rider-Waite-Smith: quando l'arte ha dato un'anima ai Tarocchi",
    "category": "Storia",
    "gated": false,
    "cite": "/news/origine-segreta-mazzo-rider-waite-smith",
    "summary": "Prima del 1909 i tarocchi erano uno specchio scarno. Waite e Pamela Colman Smith hanno trasformato la divinazione in una cartografia della psiche \u2014 e Pixie merita il primo posto."
  }
];
var NINA_BLOG_POSTS_GENERATED = [
  {
    "id": "Giustizia Articolo",
    "slug": "Giustizia Articolo",
    "title": "La Giustizia: l'equilibrio, la responsabilit\xE0 e il mistero della numerazione",
    "category": "A. Maggiori",
    "tags": [
      "Giustizia",
      "Arcani Maggiori",
      "Numerazione",
      "Rider-Waite-Smith",
      "Tarocchi di Marsiglia",
      "Simbolismo"
    ],
    "gated": false,
    "aliases": [
      "giustizia articolo",
      "giustizia-articolo",
      "giustizia",
      "arcani maggiori",
      "numerazione",
      "rider-waite-smith",
      "tarocchi di marsiglia",
      "simbolismo",
      "a maggiori",
      "equilibrio",
      "responsabilita",
      "mistero",
      "giustizia equilibrio",
      "equilibrio responsabilita",
      "responsabilita mistero",
      "mistero numerazione",
      "la giustizia"
    ],
    "summary": "Un'analisi approfondita della carta della Giustizia tra equilibrio interiore, conseguenza delle azioni e il passaggio numerico tra VIII e XI nelle diverse tradizioni tarologiche.",
    "body": "Un'analisi approfondita della carta della Giustizia tra equilibrio interiore, conseguenza delle azioni e il passaggio numerico tra VIII e XI nelle diverse tradizioni tarologiche. **C'\xE8 un momento, in ogni percorso autentico, in cui la spinta vitale del movimento e il fascino delle promesse devono fare i conti con la realt\xE0 delle conseguenze. La carta della **Giustizia** non arriva come una condanna teatrale n\xE9 come una formula rassicurante da manuale: arriva come uno specchio nitido, a volte severo, spesso liberatorio. Davanti a questo archetipo non conta ci\xF2 che abbiamo sperato a parole o immaginato in astratto, ma ci\xF2 che si \xE8 effettivamente consolidato attraverso le nostre scelte, i nostri silenzi e il modo in cui abbiamo abitato il tempo.**: Nel lavoro di ricerca e di lettura, la Giustizia chiede sempre una sosta lucida. Non serve affrettarsi a difendere la propria versione dei fatti: serve osservare dove pende il piatto della bilancia e quali azioni hanno prodotto quel peso. **Il\u2026",
    "cite": "/news/Giustizia Articolo"
  },
  {
    "id": "pamela-colman-smith-artista",
    "slug": "pamela-colman-smith-artista",
    "title": "Pamela Colman Smith: l'artista visionaria dietro i Tarocchi pi\xF9 famosi al mondo",
    "category": "Autori",
    "tags": [
      "Pamela Colman Smith",
      "Pixie",
      "Rider-Waite-Smith",
      "Golden Dawn",
      "Autori",
      "Arthur Edward Waite"
    ],
    "gated": false,
    "aliases": [
      "pamela colman smith artista",
      "pamela-colman-smith-artista",
      "pamela colman smith",
      "pixie",
      "rider-waite-smith",
      "golden dawn",
      "autori",
      "arthur edward waite",
      "pamela",
      "colman",
      "smith",
      "artista",
      "visionaria",
      "dietro",
      "tarocchi",
      "famosi",
      "pamela colman",
      "colman smith",
      "smith artista",
      "artista visionaria",
      "visionaria dietro"
    ],
    "summary": "Biografia di Pamela Colman Smith (Pixie): Golden Dawn, sinestesia e la rivoluzione visiva del mazzo Rider-Waite-Smith del 1909.",
    "body": `Biografia di Pamela Colman Smith (Pixie): Golden Dawn, sinestesia e la rivoluzione visiva del mazzo Rider-Waite-Smith del 1909. **Per oltre un secolo il suo nome \xE8 rimasto nell'ombra, schiacciato da quello del committente Arthur Edward Waite e dell'editore William Rider. Eppure, ogni volta che qualcuno oggi osserva una carta dei Tarocchi \u2014 dal sorriso enigmatico della Papessa fino all'atmosfera sospesa del Quattro di Spade \u2014 sta guardando attraverso gli occhi di **Pamela Colman Smith** (1878\u20131951), conosciuta dagli amici e negli ambienti artistici londinesi con il soprannome di **"Pixie"**.**: Illustratrice, scenografa, editrice, narratrice e membro dell'Ordine Ermetico dell'Alba Dorata (*Hermetic Order of the Golden Dawn*), Pamela Colman Smith ha rivoluzionato per sempre il linguaggio visivo dell'esoterismo occidentale, trasformando settantotto carte da gioco e di meditazione in un'opera d'arte narrativa senza precedenti. **Una vita tra tre continenti e il teatro**: Nata il 16 febbra\u2026`,
    "cite": "/news/pamela-colman-smith-artista"
  },
  {
    "id": "il-coraggio-di-iniziare-il-matto",
    "slug": "il-coraggio-di-iniziare-il-matto",
    "title": "Il Coraggio di Iniziare: Il Matto (0) e la Magia dello Sguardo Rivolto verso l'Alto",
    "category": "A. Maggiori",
    "tags": [
      "Il Matto",
      "Modulo 01",
      "Arcani Maggiori",
      "Tre Settenari"
    ],
    "gated": true,
    "aliases": [
      "il coraggio di iniziare il matto",
      "il-coraggio-di-iniziare-il-matto",
      "il matto",
      "modulo 01",
      "arcani maggiori",
      "tre settenari",
      "a maggiori",
      "coraggio",
      "iniziare",
      "matto",
      "magia",
      "dello",
      "sguardo",
      "rivolto",
      "verso",
      "coraggio iniziare",
      "iniziare matto",
      "matto magia",
      "magia dello",
      "dello sguardo"
    ],
    "summary": "Dallo slancio incontaminato della spinta originaria alla visione dei Tre Settenari \u2014 guida pratica all'archetipo della libert\xE0, della gioia e del salto fiducioso nell'ignoto. Introduzione pubblica; approfondimento riserv",
    "body": "Dallo slancio incontaminato della spinta originaria alla visione dei Tre Settenari \u2014 guida pratica all'archetipo della libert\xE0, della gioia e del salto fiducioso nell'ignoto. Introduzione pubblica; approfondimento riservato ai corsisti Maggiori. **Nel viaggio evolutivo descritto dagli Arcani Maggiori \u2014 concepiti non come strumenti di divinazione meccanica, ma come una mappa organica della psiche e della crescita umana \u2014, la figura di **0. Il Matto** occupa una posizione assolutamente unica. Collocato al di fuori della numerazione sequenziale o posto alle soglie del cammino, Il Matto incarna la spinta primordiale, l'apertura totale all'esperienza e il coraggio di mettersi in viaggio senza il peso di schemi rigidi.**: Mentre le carte numeriche e le figure di corte strutturano i dettagli delle dinamiche quotidiane e dei ruoli sociali, Il Matto rappresenta l'energia pura prima che si cristallizzi nella materia. \xC8 il principio di libert\xE0 assoluta: insegna che ogni inizio autentico richiede\u2026",
    "cite": "/news/il-coraggio-di-iniziare-il-matto"
  },
  {
    "id": "la-scintilla-del-talento-il-bagatto",
    "slug": "la-scintilla-del-talento-il-bagatto",
    "title": "Il Bagatto / Il Mago (I): La Scintilla del Talento e la Maestria di Canalizzare l'Infinito nella Realt\xE0",
    "category": "A. Maggiori",
    "tags": [
      "Il Bagatto",
      "Il Mago",
      "Modulo 01",
      "Arcani Maggiori"
    ],
    "gated": true,
    "aliases": [
      "la scintilla del talento il bagatto",
      "la-scintilla-del-talento-il-bagatto",
      "il bagatto",
      "il mago",
      "modulo 01",
      "arcani maggiori",
      "a maggiori",
      "bagatto",
      "mago",
      "scintilla",
      "talento",
      "maestria",
      "canalizzare",
      "infinito",
      "nella",
      "bagatto mago",
      "mago scintilla",
      "scintilla talento",
      "talento maestria",
      "maestria canalizzare"
    ],
    "summary": "Un viaggio profondo e viscerale nell'Arcano I, Il Bagatto (Il Mago): iconografia Waite-Smith, forza creatrice, ombre del talento e arte di incarnare l'infinito nella vita concreta. Introduzione pubblica; approfondimento ",
    "body": "Un viaggio profondo e viscerale nell'Arcano I, Il Bagatto (Il Mago): iconografia Waite-Smith, forza creatrice, ombre del talento e arte di incarnare l'infinito nella vita concreta. Introduzione pubblica; approfondimento riservato ai corsisti Maggiori. **C'\xE8 un attimo preciso, bruciante e sacro, in cui l'aria cambia densit\xE0 prima che accada qualcosa di vero. \xC8 l'istante in cui il respiro si fa pi\xF9 corto, il pensiero smette di girare a vuoto come un mulino a vento senza grano e si raccoglie in un punto solo: affilato, incandescente, indomabile. Qui non siamo pi\xF9 nell'abbandono innocente del Matto, che cammina sull'orlo del precipizio con lo sguardo rivolto al cielo e le spalle leggere. Qui siamo davanti a **Il Bagatto (o Il Mago, Arcano I)**: il primo numero, la soglia dove l'energia grezza incontra la coscienza e decide di diventare forma.**: Non lasciarti ingannare dalla calma apparente di chi sa gi\xE0 dove appoggiare le mani. Sotto la superficie levigata del talento c'\xE8 sempre una fame\u2026",
    "cite": "/news/la-scintilla-del-talento-il-bagatto"
  },
  {
    "id": "origine-segreta-mazzo-rider-waite-smith",
    "slug": "origine-segreta-mazzo-rider-waite-smith",
    "title": "L'origine segreta del mazzo Rider-Waite-Smith: quando l'arte ha dato un'anima ai Tarocchi",
    "category": "Storia",
    "tags": [
      "Rider-Waite-Smith",
      "Pamela Colman Smith",
      "Arthur Edward Waite",
      "Arcani Minori",
      "Golden Dawn",
      "Sola-Busca"
    ],
    "gated": false,
    "aliases": [
      "origine segreta mazzo rider waite smith",
      "origine-segreta-mazzo-rider-waite-smith",
      "rider-waite-smith",
      "pamela colman smith",
      "arthur edward waite",
      "arcani minori",
      "golden dawn",
      "sola-busca",
      "storia",
      "origine",
      "segreta",
      "mazzo",
      "quando",
      "arte",
      "dato",
      "anima",
      "origine segreta",
      "segreta mazzo",
      "mazzo rider-waite-smith",
      "rider-waite-smith quando",
      "quando arte",
      "rider waite",
      "waite"
    ],
    "summary": "Prima del 1909 i tarocchi erano uno specchio scarno. Waite e Pamela Colman Smith hanno trasformato la divinazione in una cartografia della psiche \u2014 e Pixie merita il primo posto.",
    "body": "Prima del 1909 i tarocchi erano uno specchio scarno. Waite e Pamela Colman Smith hanno trasformato la divinazione in una cartografia della psiche \u2014 e Pixie merita il primo posto. **Se oggi parliamo di Tarocchi e visualizziamo immediatamente scene ricche di dettagli, figure umane espressive e paesaggi allegorici in ogni singolo arcano minore, lo dobbiamo a un incontro irripetibile avvenuto nei primi anni del Novecento. Prima del 1909, i tarocchi erano prevalentemente uno specchio scarno ed ermetico (pensiamo al Tarot de Marseille), dove i semi di spade, coppe, denari e bastoni si limitavano a ripetere geometricamente il proprio simbolo, lasciando quasi interamente all'intuizione l'interpretazione della carta.**: La nascita del mazzo Rider-Waite-Smith ha cambiato per sempre le regole del gioco, trasformando la divinazione in una vera e propria cartografia della psiche. Ma chi c'\xE8 davvero dietro a questa rivoluzione? **1. Gli architetti: Arthur Edward Waite e Pamela Colman Smith**: La na\u2026",
    "cite": "/news/origine-segreta-mazzo-rider-waite-smith"
  }
];

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

// src/data/ninaMinoriCards.generated.ts
var NINA_MINORI_INTRO = `Nei Tarocchi, gli Arcani Minori rappresentano la vita quotidiana, le azioni concrete, le emozioni del momento, il lavoro, le relazioni e le sfide pratiche. A differenza degli Arcani Maggiori \u2014 che parlano di grandi archetipi e svolte esistenziali \u2014 i Minori descrivono il "qui e ora". Ogni carta pu\xF2 essere letta secondo due polarit\xE0: - **Luce**: l'espressione armoniosa, consapevole, costruttiva e fluida dell'energia della carta (o una risorsa attiva e favorevole). - **Ombra**: l'eccesso, il blocco, la paura, l'autoinganno, l'impulsivit\xE0 o la rigidit\xE0 legata a quella stessa energia (non necessariamente una "sfortuna" inevitabile, ma spesso un campanello d'allarme o un'abitudine da riequilibrare). I 56 Arcani Minori si dividono in quattro semi (Bastoni, Coppe, Spade, Denari) e, per ciascun seme, 14 carte: dall'Asso al 10, pi\xF9 le 4 carte di Corte (Fante, Cavallo, Regina, Re).`;
var NINA_MINORI_PRATICA = `- Non leggere l'Ombra come una condanna: spesso indica un'abitudine automatica. - Osserva l'equilibrio del seme: molte Spade in ombra \u2192 sovraccarico mentale/comunicativo; molte Coppe in ombra \u2192 confini emotivi o aspettative. - Trasforma l'Ombra in Luce: "Quale piccola azione o cambio di sguardo porta questa energia dalla sua ombra alla sua luce?"`;
var NINA_MINORI_DOMANDE_INTRO = "Gli Arcani Minori lavorano sul tessuto vivo delle giornate: scelte pratiche, attriti relazionali, ritmo del lavoro, abitudini corporee e risposte emotive immediate. Invece di leggere la carta come una sentenza chiusa, usa la domanda per aprire un varco di consapevolezza e restituire agency a chi interroga il mazzo. - **Scegli o incrocia**: puoi porre la domanda legata alla carta estratta oppure usare le domande di pi\xF9 carte vicine per far dialogare un blocco concreto con una risorsa. - **Osserva il seme dominante**: pi\xF9 domande su Spade \u2192 pensieri, narrazioni e confini verbali; Coppe \u2192 legami, attesa e risonanza emotiva; Bastoni \u2192 azione e attrito creativo; Denari \u2192 corpo, tempo, denaro e ma";
var NINA_MINORI_SUIT_FRAMES = [
  {
    "id": "bastoni",
    "title": "Bastoni",
    "aliases": [
      "bastoni",
      "bastone",
      "wands",
      "wand"
    ],
    "body": "### Seme: Bastoni\n- **Senso**: fuoco \u2014 azione, volont\xE0 e progetto. iniziativa, energia vitale, creativit\xE0, coraggio, lavoro e spinta a fare.\n- **Focus domande**: spinta, fuoco e direzione."
  },
  {
    "id": "coppe",
    "title": "Coppe",
    "aliases": [
      "coppe",
      "coppa",
      "cups",
      "cup"
    ],
    "body": "### Seme: Coppe\n- **Senso**: acqua \u2014 emozioni, legami e intuizione. sentimenti, empatia, relazioni affettive, vita interiore, creativit\xE0 emotiva e connessione con se stessi e con gli altri.\n- **Focus domande**: legami, acque interne e risonanza."
  },
  {
    "id": "spade",
    "title": "Spade",
    "aliases": [
      "spade",
      "spada",
      "swords",
      "sword"
    ],
    "body": "### Seme: Spade\n- **Senso**: aria \u2014 pensiero, verit\xE0, parole e conflitto. mente, logica, linguaggio, decisioni, chiarezza; anche tensioni, preoccupazioni, tagli necessari e conflitti.\n- **Focus domande**: lucidit\xE0, parole, tagli e pensiero."
  },
  {
    "id": "denari",
    "title": "Denari",
    "aliases": [
      "denari",
      "denaro",
      "pentacoli",
      "pentacolo",
      "pentacles",
      "coins",
      "coin"
    ],
    "body": "### Seme: Denari\n- **Senso**: terra \u2014 concretezza, risorse, lavoro e corpo. materia, lavoro, denaro, tempo, salute/corpo, pazienza, costruzione duratura e valore concreto. (Anche detti Pentacoli.)\n- **Focus domande**: materia, corpo, lavoro e radici."
  }
];
var NINA_MINORI_CARDS_GENERATED = [
  {
    "id": "bastoni-asso",
    "suit": "bastoni",
    "rank": "asso",
    "title": "Asso di Bastoni",
    "aliases": [
      "asso di bastoni",
      "asso bastoni",
      "asso of bastoni",
      "asso di bastone",
      "asso bastone",
      "asso of bastone",
      "asso di wands",
      "asso wands",
      "asso of wands",
      "asso di wand",
      "asso wand",
      "asso of wand",
      "ace di bastoni",
      "ace bastoni",
      "ace of bastoni",
      "ace di bastone",
      "ace bastone",
      "ace of bastone",
      "ace di wands",
      "ace wands",
      "ace of wands",
      "ace di wand",
      "ace wand",
      "ace of wand"
    ],
    "body": "### Asso di Bastoni\n- **Senso**: Bastoni \u2014 fuoco \u2014 azione, volont\xE0 e progetto. iniziativa, energia vitale, creativit\xE0, coraggio, lavoro e spinta a fare.\n- **Luce/ombra**: Luce \u2014 scintilla creativa, entusiasmo puro, nuovo inizio, coraggio di mettersi in gioco, slancio vitale. Ombra \u2014 partenza a freddo senza continuit\xE0, impazienza, energia dispersa, fuochi di paglia.\n- **Domanda**: Dov'\xE8 che sento una spinta viva ma ho paura di accenderla davvero?"
  },
  {
    "id": "bastoni-2",
    "suit": "bastoni",
    "rank": "2",
    "title": "2 di Bastoni",
    "aliases": [
      "2 di bastoni",
      "2 bastoni",
      "2 of bastoni",
      "2 di bastone",
      "2 bastone",
      "2 of bastone",
      "2 di wands",
      "2 wands",
      "2 of wands",
      "2 di wand",
      "2 wand",
      "2 of wand",
      "due di bastoni",
      "due bastoni",
      "due of bastoni",
      "due di bastone",
      "due bastone",
      "due of bastone",
      "due di wands",
      "due wands",
      "due of wands",
      "due di wand",
      "due wand",
      "due of wand",
      "two di bastoni",
      "two bastoni",
      "two of bastoni",
      "two di bastone",
      "two bastone",
      "two of bastone",
      "two di wands",
      "two wands",
      "two of wands",
      "two di wand",
      "two wand",
      "two of wand"
    ],
    "body": "### 2 di Bastoni\n- **Senso**: Bastoni \u2014 fuoco \u2014 azione, volont\xE0 e progetto. iniziativa, energia vitale, creativit\xE0, coraggio, lavoro e spinta a fare.\n- **Luce/ombra**: Luce \u2014 visione d'insieme, pianificazione strategica, scelta consapevole, apertura verso nuovi orizzonti. Ombra \u2014 indecisione paralizzante, paura di lasciare la zona di comfort, controllo eccessivo sul futuro.\n- **Domanda**: Che cosa sto tenendo in mano oggi e che orizzonte sto guardando prima di fare il passo?"
  },
  {
    "id": "bastoni-3",
    "suit": "bastoni",
    "rank": "3",
    "title": "3 di Bastoni",
    "aliases": [
      "3 di bastoni",
      "3 bastoni",
      "3 of bastoni",
      "3 di bastone",
      "3 bastone",
      "3 of bastone",
      "3 di wands",
      "3 wands",
      "3 of wands",
      "3 di wand",
      "3 wand",
      "3 of wand",
      "tre di bastoni",
      "tre bastoni",
      "tre of bastoni",
      "tre di bastone",
      "tre bastone",
      "tre of bastone",
      "tre di wands",
      "tre wands",
      "tre of wands",
      "tre di wand",
      "tre wand",
      "tre of wand",
      "three di bastoni",
      "three bastoni",
      "three of bastoni",
      "three di bastone",
      "three bastone",
      "three of bastone",
      "three di wands",
      "three wands",
      "three of wands",
      "three di wand",
      "three wand",
      "three of wand"
    ],
    "body": "### 3 di Bastoni\n- **Senso**: Bastoni \u2014 fuoco \u2014 azione, volont\xE0 e progetto. iniziativa, energia vitale, creativit\xE0, coraggio, lavoro e spinta a fare.\n- **Luce/ombra**: Luce \u2014 espansione, primi risultati concreti, collaborazione fruttuosa, fiducia nel percorso avviato. Ombra \u2014 aspettative irrealistiche, impazienza nell'attesa, arroganza o eccessiva distanza dagli altri.\n- **Domanda**: Quale movimento ho gi\xE0 avviato e che cosa richiede ora pazienza e prospettiva pi\xF9 ampia?"
  },
  {
    "id": "bastoni-4",
    "suit": "bastoni",
    "rank": "4",
    "title": "4 di Bastoni",
    "aliases": [
      "4 di bastoni",
      "4 bastoni",
      "4 of bastoni",
      "4 di bastone",
      "4 bastone",
      "4 of bastone",
      "4 di wands",
      "4 wands",
      "4 of wands",
      "4 di wand",
      "4 wand",
      "4 of wand",
      "quattro di bastoni",
      "quattro bastoni",
      "quattro of bastoni",
      "quattro di bastone",
      "quattro bastone",
      "quattro of bastone",
      "quattro di wands",
      "quattro wands",
      "quattro of wands",
      "quattro di wand",
      "quattro wand",
      "quattro of wand",
      "four di bastoni",
      "four bastoni",
      "four of bastoni",
      "four di bastone",
      "four bastone",
      "four of bastone",
      "four di wands",
      "four wands",
      "four of wands",
      "four di wand",
      "four wand",
      "four of wand"
    ],
    "body": "### 4 di Bastoni\n- **Senso**: Bastoni \u2014 fuoco \u2014 azione, volont\xE0 e progetto. iniziativa, energia vitale, creativit\xE0, coraggio, lavoro e spinta a fare.\n- **Luce/ombra**: Luce \u2014 celebrazione, armonia, stabilit\xE0 condivisa, senso di casa o traguardo raggiunto insieme. Ombra \u2014 compiacimento, formalismo vuoto, paura che la stabilit\xE0 sia temporanea, chiusura verso il cambiamento.\n- **Domanda**: Qual \xE8 lo spazio, la relazione o il traguardo che merita di essere riconosciuto e abitato senza fretta?"
  },
  {
    "id": "bastoni-5",
    "suit": "bastoni",
    "rank": "5",
    "title": "5 di Bastoni",
    "aliases": [
      "5 di bastoni",
      "5 bastoni",
      "5 of bastoni",
      "5 di bastone",
      "5 bastone",
      "5 of bastone",
      "5 di wands",
      "5 wands",
      "5 of wands",
      "5 di wand",
      "5 wand",
      "5 of wand",
      "cinque di bastoni",
      "cinque bastoni",
      "cinque of bastoni",
      "cinque di bastone",
      "cinque bastone",
      "cinque of bastone",
      "cinque di wands",
      "cinque wands",
      "cinque of wands",
      "cinque di wand",
      "cinque wand",
      "cinque of wand",
      "five di bastoni",
      "five bastoni",
      "five of bastoni",
      "five di bastone",
      "five bastone",
      "five of bastone",
      "five di wands",
      "five wands",
      "five of wands",
      "five di wand",
      "five wand",
      "five of wand"
    ],
    "body": "### 5 di Bastoni\n- **Senso**: Bastoni \u2014 fuoco \u2014 azione, volont\xE0 e progetto. iniziativa, energia vitale, creativit\xE0, coraggio, lavoro e spinta a fare.\n- **Luce/ombra**: Luce \u2014 confronto stimolante, dibattito costruttivo, energia competitiva sana che affina le idee. Ombra \u2014 conflitti sterili, caos, battibecchi per l'ego, dispersione di energie in lotte inutili.\n- **Domanda**: Che cosa sta creando attrito intorno a me e quale parte di quell'energia \xE8 un confronto utile invece che una lotta d'orgoglio?"
  },
  {
    "id": "bastoni-6",
    "suit": "bastoni",
    "rank": "6",
    "title": "6 di Bastoni",
    "aliases": [
      "6 di bastoni",
      "6 bastoni",
      "6 of bastoni",
      "6 di bastone",
      "6 bastone",
      "6 of bastone",
      "6 di wands",
      "6 wands",
      "6 of wands",
      "6 di wand",
      "6 wand",
      "6 of wand",
      "sei di bastoni",
      "sei bastoni",
      "sei of bastoni",
      "sei di bastone",
      "sei bastone",
      "sei of bastone",
      "sei di wands",
      "sei wands",
      "sei of wands",
      "sei di wand",
      "sei wand",
      "sei of wand",
      "six di bastoni",
      "six bastoni",
      "six of bastoni",
      "six di bastone",
      "six bastone",
      "six of bastone",
      "six di wands",
      "six wands",
      "six of wands",
      "six di wand",
      "six wand",
      "six of wand"
    ],
    "body": "### 6 di Bastoni\n- **Senso**: Bastoni \u2014 fuoco \u2014 azione, volont\xE0 e progetto. iniziativa, energia vitale, creativit\xE0, coraggio, lavoro e spinta a fare.\n- **Luce/ombra**: Luce \u2014 riconoscimento meritato, successo visibile, leadership naturale, autostima solida. Ombra \u2014 vanit\xE0, bisogno costante di applausi, timore di perdere il primato, isolamento dal gruppo.\n- **Domanda**: Dove sto cercando approvazione esterna e dove invece riconosco gi\xE0 da solo il valore di ci\xF2 che ho fatto?"
  },
  {
    "id": "bastoni-7",
    "suit": "bastoni",
    "rank": "7",
    "title": "7 di Bastoni",
    "aliases": [
      "7 di bastoni",
      "7 bastoni",
      "7 of bastoni",
      "7 di bastone",
      "7 bastone",
      "7 of bastone",
      "7 di wands",
      "7 wands",
      "7 of wands",
      "7 di wand",
      "7 wand",
      "7 of wand",
      "sette di bastoni",
      "sette bastoni",
      "sette of bastoni",
      "sette di bastone",
      "sette bastone",
      "sette of bastone",
      "sette di wands",
      "sette wands",
      "sette of wands",
      "sette di wand",
      "sette wand",
      "sette of wand",
      "seven di bastoni",
      "seven bastoni",
      "seven of bastoni",
      "seven di bastone",
      "seven bastone",
      "seven of bastone",
      "seven di wands",
      "seven wands",
      "seven of wands",
      "seven di wand",
      "seven wand",
      "seven of wand"
    ],
    "body": "### 7 di Bastoni\n- **Senso**: Bastoni \u2014 fuoco \u2014 azione, volont\xE0 e progetto. iniziativa, energia vitale, creativit\xE0, coraggio, lavoro e spinta a fare.\n- **Luce/ombra**: Luce \u2014 fermezza, difesa dei propri confini e valori, determinazione sotto pressione. Ombra \u2014 atteggiamento difensivo cronico, paranoia, ostinazione, fatica per voler combattere tutto da soli.\n- **Domanda**: Quale confine devo difendere con fermezza e dove invece sto sprecando forze a combattere battaglie non mie?"
  },
  {
    "id": "bastoni-8",
    "suit": "bastoni",
    "rank": "8",
    "title": "8 di Bastoni",
    "aliases": [
      "8 di bastoni",
      "8 bastoni",
      "8 of bastoni",
      "8 di bastone",
      "8 bastone",
      "8 of bastone",
      "8 di wands",
      "8 wands",
      "8 of wands",
      "8 di wand",
      "8 wand",
      "8 of wand",
      "otto di bastoni",
      "otto bastoni",
      "otto of bastoni",
      "otto di bastone",
      "otto bastone",
      "otto of bastone",
      "otto di wands",
      "otto wands",
      "otto of wands",
      "otto di wand",
      "otto wand",
      "otto of wand",
      "eight di bastoni",
      "eight bastoni",
      "eight of bastoni",
      "eight di bastone",
      "eight bastone",
      "eight of bastone",
      "eight di wands",
      "eight wands",
      "eight of wands",
      "eight di wand",
      "eight wand",
      "eight of wand"
    ],
    "body": "### 8 di Bastoni\n- **Senso**: Bastoni \u2014 fuoco \u2014 azione, volont\xE0 e progetto. iniziativa, energia vitale, creativit\xE0, coraggio, lavoro e spinta a fare.\n- **Luce/ombra**: Luce \u2014 rapidit\xE0, avanzamento veloce, notizie in arrivo, allineamento e flusso scorrevole. Ombra \u2014 fretta, precipitazione, sovraccarico di stimoli, mancanza di radicamento o riflessione.\n- **Domanda**: Che cosa si sta muovendo velocemente nella mia vita in questo momento e dove ho bisogno di tenere il timone?"
  },
  {
    "id": "bastoni-9",
    "suit": "bastoni",
    "rank": "9",
    "title": "9 di Bastoni",
    "aliases": [
      "9 di bastoni",
      "9 bastoni",
      "9 of bastoni",
      "9 di bastone",
      "9 bastone",
      "9 of bastone",
      "9 di wands",
      "9 wands",
      "9 of wands",
      "9 di wand",
      "9 wand",
      "9 of wand",
      "nove di bastoni",
      "nove bastoni",
      "nove of bastoni",
      "nove di bastone",
      "nove bastone",
      "nove of bastone",
      "nove di wands",
      "nove wands",
      "nove of wands",
      "nove di wand",
      "nove wand",
      "nove of wand",
      "nine di bastoni",
      "nine bastoni",
      "nine of bastoni",
      "nine di bastone",
      "nine bastone",
      "nine of bastone",
      "nine di wands",
      "nine wands",
      "nine of wands",
      "nine di wand",
      "nine wand",
      "nine of wand"
    ],
    "body": "### 9 di Bastoni\n- **Senso**: Bastoni \u2014 fuoco \u2014 azione, volont\xE0 e progetto. iniziativa, energia vitale, creativit\xE0, coraggio, lavoro e spinta a fare.\n- **Luce/ombra**: Luce \u2014 resilienza, tenacia, prudenza maturata dall'esperienza, forza nell'ultimo tratto. Ombra \u2014 sfinimento, ipervigilanza, diffidenza verso chiunque, rigidit\xE0 per vecchie ferite.\n- **Domanda**: Quale stanchezza o vecchia guardia sto portando su questo nuovo passaggio?"
  },
  {
    "id": "bastoni-10",
    "suit": "bastoni",
    "rank": "10",
    "title": "10 di Bastoni",
    "aliases": [
      "10 di bastoni",
      "10 bastoni",
      "10 of bastoni",
      "10 di bastone",
      "10 bastone",
      "10 of bastone",
      "10 di wands",
      "10 wands",
      "10 of wands",
      "10 di wand",
      "10 wand",
      "10 of wand",
      "dieci di bastoni",
      "dieci bastoni",
      "dieci of bastoni",
      "dieci di bastone",
      "dieci bastone",
      "dieci of bastone",
      "dieci di wands",
      "dieci wands",
      "dieci of wands",
      "dieci di wand",
      "dieci wand",
      "dieci of wand",
      "ten di bastoni",
      "ten bastoni",
      "ten of bastoni",
      "ten di bastone",
      "ten bastone",
      "ten of bastone",
      "ten di wands",
      "ten wands",
      "ten of wands",
      "ten di wand",
      "ten wand",
      "ten of wand"
    ],
    "body": '### 10 di Bastoni\n- **Senso**: Bastoni \u2014 fuoco \u2014 azione, volont\xE0 e progetto. iniziativa, energia vitale, creativit\xE0, coraggio, lavoro e spinta a fare.\n- **Luce/ombra**: Luce \u2014 impegno totale, senso di responsabilit\xE0, completamento di una fase impegnativa. Ombra \u2014 sovraccarico, incapacit\xE0 di delegare, vittimismo ("faccio tutto io"), burnout.\n- **Domanda**: Che peso mi sono caricato addosso per abitudine o senso del dovere che non mi appartiene pi\xF9 per intero?'
  },
  {
    "id": "bastoni-fante",
    "suit": "bastoni",
    "rank": "fante",
    "title": "Fante di Bastoni",
    "aliases": [
      "fante di bastoni",
      "fante bastoni",
      "fante of bastoni",
      "fante di bastone",
      "fante bastone",
      "fante of bastone",
      "fante di wands",
      "fante wands",
      "fante of wands",
      "fante di wand",
      "fante wand",
      "fante of wand",
      "page di bastoni",
      "page bastoni",
      "page of bastoni",
      "page di bastone",
      "page bastone",
      "page of bastone",
      "page di wands",
      "page wands",
      "page of wands",
      "page di wand",
      "page wand",
      "page of wand",
      "paggio di bastoni",
      "paggio bastoni",
      "paggio of bastoni",
      "paggio di bastone",
      "paggio bastone",
      "paggio of bastone",
      "paggio di wands",
      "paggio wands",
      "paggio of wands",
      "paggio di wand",
      "paggio wand",
      "paggio of wand"
    ],
    "body": "### Fante di Bastoni\n- **Senso**: Bastoni \u2014 fuoco \u2014 azione, volont\xE0 e progetto. iniziativa, energia vitale, creativit\xE0, coraggio, lavoro e spinta a fare.\n- **Luce/ombra**: Luce \u2014 curiosit\xE0, intraprendenza, voglia di sperimentare, entusiasmo contagioso. Ombra \u2014 incostanza, superficialit\xE0, reattivit\xE0 impulsiva, promesse fatte con leggerezza.\n- **Domanda**: Quale curiosit\xE0 nuova mi sta chiamando e come posso provarla senza bruciarmi subito?"
  },
  {
    "id": "bastoni-cavallo",
    "suit": "bastoni",
    "rank": "cavallo",
    "title": "Cavallo di Bastoni",
    "aliases": [
      "cavallo di bastoni",
      "cavallo bastoni",
      "cavallo of bastoni",
      "cavallo di bastone",
      "cavallo bastone",
      "cavallo of bastone",
      "cavallo di wands",
      "cavallo wands",
      "cavallo of wands",
      "cavallo di wand",
      "cavallo wand",
      "cavallo of wand",
      "knight di bastoni",
      "knight bastoni",
      "knight of bastoni",
      "knight di bastone",
      "knight bastone",
      "knight of bastone",
      "knight di wands",
      "knight wands",
      "knight of wands",
      "knight di wand",
      "knight wand",
      "knight of wand",
      "cavaliere di bastoni",
      "cavaliere bastoni",
      "cavaliere of bastoni",
      "cavaliere di bastone",
      "cavaliere bastone",
      "cavaliere of bastone",
      "cavaliere di wands",
      "cavaliere wands",
      "cavaliere of wands",
      "cavaliere di wand",
      "cavaliere wand",
      "cavaliere of wand"
    ],
    "body": "### Cavallo di Bastoni\n- **Senso**: Bastoni \u2014 fuoco \u2014 azione, volont\xE0 e progetto. iniziativa, energia vitale, creativit\xE0, coraggio, lavoro e spinta a fare.\n- **Luce/ombra**: Luce \u2014 passione travolgente, audacia, movimento rapido, spirito d'avventura. Ombra \u2014 avventatezza, sbandate emotive, aggressivit\xE0, difficolt\xE0 a portare a termine ci\xF2 che inizia.\n- **Domanda**: Dove sto correndo troppo in avanti rispetto alla realt\xE0 concreta della situazione?"
  },
  {
    "id": "bastoni-regina",
    "suit": "bastoni",
    "rank": "regina",
    "title": "Regina di Bastoni",
    "aliases": [
      "regina di bastoni",
      "regina bastoni",
      "regina of bastoni",
      "regina di bastone",
      "regina bastone",
      "regina of bastone",
      "regina di wands",
      "regina wands",
      "regina of wands",
      "regina di wand",
      "regina wand",
      "regina of wand",
      "queen di bastoni",
      "queen bastoni",
      "queen of bastoni",
      "queen di bastone",
      "queen bastone",
      "queen of bastone",
      "queen di wands",
      "queen wands",
      "queen of wands",
      "queen di wand",
      "queen wand",
      "queen of wand"
    ],
    "body": "### Regina di Bastoni\n- **Senso**: Bastoni \u2014 fuoco \u2014 azione, volont\xE0 e progetto. iniziativa, energia vitale, creativit\xE0, coraggio, lavoro e spinta a fare.\n- **Luce/ombra**: Luce \u2014 carisma, calore, indipendenza, fiducia in s\xE9, capacit\xE0 di ispirare gli altri. Ombra \u2014 permalosit\xE0, gelosia, autoritarismo, bisogno di avere sempre l'ultima parola.\n- **Domanda**: Come posso incarnare la mia forza e la mia voce con calore, senza trasformarle in reattivit\xE0 o controllo?"
  },
  {
    "id": "bastoni-re",
    "suit": "bastoni",
    "rank": "re",
    "title": "Re di Bastoni",
    "aliases": [
      "re di bastoni",
      "re bastoni",
      "re of bastoni",
      "re di bastone",
      "re bastone",
      "re of bastone",
      "re di wands",
      "re wands",
      "re of wands",
      "re di wand",
      "re wand",
      "re of wand",
      "king di bastoni",
      "king bastoni",
      "king of bastoni",
      "king di bastone",
      "king bastone",
      "king of bastone",
      "king di wands",
      "king wands",
      "king of wands",
      "king di wand",
      "king wand",
      "king of wand"
    ],
    "body": "### Re di Bastoni\n- **Senso**: Bastoni \u2014 fuoco \u2014 azione, volont\xE0 e progetto. iniziativa, energia vitale, creativit\xE0, coraggio, lavoro e spinta a fare.\n- **Luce/ombra**: Luce \u2014 leadership visionaria, decisione, integrit\xE0, capacit\xE0 di guidare grandi progetti. Ombra \u2014 dispotismo, impazienza verso i ritmi altrui, ego ingombrante, rigidit\xE0 d'intenti.\n- **Domanda**: Che direzione voglio guidare con chiarezza e dove devo lasciare spazio senza imporre il mio ritmo?"
  },
  {
    "id": "coppe-asso",
    "suit": "coppe",
    "rank": "asso",
    "title": "Asso di Coppe",
    "aliases": [
      "asso di coppe",
      "asso coppe",
      "asso of coppe",
      "asso di coppa",
      "asso coppa",
      "asso of coppa",
      "asso di cups",
      "asso cups",
      "asso of cups",
      "asso di cup",
      "asso cup",
      "asso of cup",
      "ace di coppe",
      "ace coppe",
      "ace of coppe",
      "ace di coppa",
      "ace coppa",
      "ace of coppa",
      "ace di cups",
      "ace cups",
      "ace of cups",
      "ace di cup",
      "ace cup",
      "ace of cup"
    ],
    "body": "### Asso di Coppe\n- **Senso**: Coppe \u2014 acqua \u2014 emozioni, legami e intuizione. sentimenti, empatia, relazioni affettive, vita interiore, creativit\xE0 emotiva e connessione con se stessi e con gli altri.\n- **Luce/ombra**: Luce \u2014 apertura del cuore, amore autentico, empatia, nuova fase emotiva o ispirazione profonda. Ombra \u2014 ipersensibilit\xE0, aspettative affettive idealizzate, chiusura emotiva per paura di soffrire.\n- **Domanda**: Che cosa sta chiedendo di essere accolto nel mio cuore o nella mia sensibilit\xE0 in questo momento?"
  },
  {
    "id": "coppe-2",
    "suit": "coppe",
    "rank": "2",
    "title": "2 di Coppe",
    "aliases": [
      "2 di coppe",
      "2 coppe",
      "2 of coppe",
      "2 di coppa",
      "2 coppa",
      "2 of coppa",
      "2 di cups",
      "2 cups",
      "2 of cups",
      "2 di cup",
      "2 cup",
      "2 of cup",
      "due di coppe",
      "due coppe",
      "due of coppe",
      "due di coppa",
      "due coppa",
      "due of coppa",
      "due di cups",
      "due cups",
      "due of cups",
      "due di cup",
      "due cup",
      "due of cup",
      "two di coppe",
      "two coppe",
      "two of coppe",
      "two di coppa",
      "two coppa",
      "two of coppa",
      "two di cups",
      "two cups",
      "two of cups",
      "two di cup",
      "two cup",
      "two of cup"
    ],
    "body": "### 2 di Coppe\n- **Senso**: Coppe \u2014 acqua \u2014 emozioni, legami e intuizione. sentimenti, empatia, relazioni affettive, vita interiore, creativit\xE0 emotiva e connessione con se stessi e con gli altri.\n- **Luce/ombra**: Luce \u2014 reciprocit\xE0, sintonia, alleanza equilibrata, dialogo sincero e rispetto mutuo. Ombra \u2014 dipendenza affettiva, fusione eccessiva dove si perde l'individualit\xE0, incomprensioni.\n- **Domanda**: Dov'\xE8 che cerco un incontro autentico e dov'\xE8 che invece sto chiedendo all'altro di colmare un vuoto mio?"
  },
  {
    "id": "coppe-3",
    "suit": "coppe",
    "rank": "3",
    "title": "3 di Coppe",
    "aliases": [
      "3 di coppe",
      "3 coppe",
      "3 of coppe",
      "3 di coppa",
      "3 coppa",
      "3 of coppa",
      "3 di cups",
      "3 cups",
      "3 of cups",
      "3 di cup",
      "3 cup",
      "3 of cup",
      "tre di coppe",
      "tre coppe",
      "tre of coppe",
      "tre di coppa",
      "tre coppa",
      "tre of coppa",
      "tre di cups",
      "tre cups",
      "tre of cups",
      "tre di cup",
      "tre cup",
      "tre of cup",
      "three di coppe",
      "three coppe",
      "three of coppe",
      "three di coppa",
      "three coppa",
      "three of coppa",
      "three di cups",
      "three cups",
      "three of cups",
      "three di cup",
      "three cup",
      "three of cup"
    ],
    "body": "### 3 di Coppe\n- **Senso**: Coppe \u2014 acqua \u2014 emozioni, legami e intuizione. sentimenti, empatia, relazioni affettive, vita interiore, creativit\xE0 emotiva e connessione con se stessi e con gli altri.\n- **Luce/ombra**: Luce \u2014 amicizia, condivisione, gioia collettiva, supporto reciproco, creativit\xE0 di gruppo. Ombra \u2014 pettegolezzi, superficialit\xE0, conformismo, eccessi o senso di esclusione.\n- **Domanda**: Quali legami o spazi condivisi mi nutrono davvero e dove sto restando solo per non restare fuori?"
  },
  {
    "id": "coppe-4",
    "suit": "coppe",
    "rank": "4",
    "title": "4 di Coppe",
    "aliases": [
      "4 di coppe",
      "4 coppe",
      "4 of coppe",
      "4 di coppa",
      "4 coppa",
      "4 of coppa",
      "4 di cups",
      "4 cups",
      "4 of cups",
      "4 di cup",
      "4 cup",
      "4 of cup",
      "quattro di coppe",
      "quattro coppe",
      "quattro of coppe",
      "quattro di coppa",
      "quattro coppa",
      "quattro of coppa",
      "quattro di cups",
      "quattro cups",
      "quattro of cups",
      "quattro di cup",
      "quattro cup",
      "quattro of cup",
      "four di coppe",
      "four coppe",
      "four of coppe",
      "four di coppa",
      "four coppa",
      "four of coppa",
      "four di cups",
      "four cups",
      "four of cups",
      "four di cup",
      "four cup",
      "four of cup"
    ],
    "body": "### 4 di Coppe\n- **Senso**: Coppe \u2014 acqua \u2014 emozioni, legami e intuizione. sentimenti, empatia, relazioni affettive, vita interiore, creativit\xE0 emotiva e connessione con se stessi e con gli altri.\n- **Luce/ombra**: Luce \u2014 raccoglimento, introspezione, pausa necessaria per valutare cosa nutre davvero. Ombra \u2014 apatia, noia, ingratitudine, chiusura verso opportunit\xE0 concrete perch\xE9 presi dal malumore.\n- **Domanda**: Che cosa sto rifiutando o ignorando per chiusura, stanchezza o aspettativa delusa?"
  },
  {
    "id": "coppe-5",
    "suit": "coppe",
    "rank": "5",
    "title": "5 di Coppe",
    "aliases": [
      "5 di coppe",
      "5 coppe",
      "5 of coppe",
      "5 di coppa",
      "5 coppa",
      "5 of coppa",
      "5 di cups",
      "5 cups",
      "5 of cups",
      "5 di cup",
      "5 cup",
      "5 of cup",
      "cinque di coppe",
      "cinque coppe",
      "cinque of coppe",
      "cinque di coppa",
      "cinque coppa",
      "cinque of coppa",
      "cinque di cups",
      "cinque cups",
      "cinque of cups",
      "cinque di cup",
      "cinque cup",
      "cinque of cup",
      "five di coppe",
      "five coppe",
      "five of coppe",
      "five di coppa",
      "five coppa",
      "five of coppa",
      "five di cups",
      "five cups",
      "five of cups",
      "five di cup",
      "five cup",
      "five of cup"
    ],
    "body": "### 5 di Coppe\n- **Senso**: Coppe \u2014 acqua \u2014 emozioni, legami e intuizione. sentimenti, empatia, relazioni affettive, vita interiore, creativit\xE0 emotiva e connessione con se stessi e con gli altri.\n- **Luce/ombra**: Luce \u2014 elaborazione del dolore, lucidit\xE0 su ci\xF2 che \xE8 andato perso senza negare le emozioni. Ombra \u2014 rimuginio, autocommiserazione, fissazione su ci\xF2 che manca ignorando ci\xF2 che resta.\n- **Domanda**: Qual \xE8 la perdita o la delusione che sto guardando, e che cosa resta ancora vivo proprio accanto a quel dolore?"
  },
  {
    "id": "coppe-6",
    "suit": "coppe",
    "rank": "6",
    "title": "6 di Coppe",
    "aliases": [
      "6 di coppe",
      "6 coppe",
      "6 of coppe",
      "6 di coppa",
      "6 coppa",
      "6 of coppa",
      "6 di cups",
      "6 cups",
      "6 of cups",
      "6 di cup",
      "6 cup",
      "6 of cup",
      "sei di coppe",
      "sei coppe",
      "sei of coppe",
      "sei di coppa",
      "sei coppa",
      "sei of coppa",
      "sei di cups",
      "sei cups",
      "sei of cups",
      "sei di cup",
      "sei cup",
      "sei of cup",
      "six di coppe",
      "six coppe",
      "six of coppe",
      "six di coppa",
      "six coppa",
      "six of coppa",
      "six di cups",
      "six cups",
      "six of cups",
      "six di cup",
      "six cup",
      "six of cup"
    ],
    "body": "### 6 di Coppe\n- **Senso**: Coppe \u2014 acqua \u2014 emozioni, legami e intuizione. sentimenti, empatia, relazioni affettive, vita interiore, creativit\xE0 emotiva e connessione con se stessi e con gli altri.\n- **Luce/ombra**: Luce \u2014 dolcezza, nostalgia serena, innocenza, generosit\xE0 spontanea, radici affettive. Ombra \u2014 idealizzazione del passato, regressione, difficolt\xE0 a stare nel presente e a crescere.\n- **Domanda**: Quale memoria, tenerezza o radice mi sostiene oggi e dove invece mi sto rifugiando nel passato per evitare il presente?"
  },
  {
    "id": "coppe-7",
    "suit": "coppe",
    "rank": "7",
    "title": "7 di Coppe",
    "aliases": [
      "7 di coppe",
      "7 coppe",
      "7 of coppe",
      "7 di coppa",
      "7 coppa",
      "7 of coppa",
      "7 di cups",
      "7 cups",
      "7 of cups",
      "7 di cup",
      "7 cup",
      "7 of cup",
      "sette di coppe",
      "sette coppe",
      "sette of coppe",
      "sette di coppa",
      "sette coppa",
      "sette of coppa",
      "sette di cups",
      "sette cups",
      "sette of cups",
      "sette di cup",
      "sette cup",
      "sette of cup",
      "seven di coppe",
      "seven coppe",
      "seven of coppe",
      "seven di coppa",
      "seven coppa",
      "seven of coppa",
      "seven di cups",
      "seven cups",
      "seven of cups",
      "seven di cup",
      "seven cup",
      "seven of cup"
    ],
    "body": "### 7 di Coppe\n- **Senso**: Coppe \u2014 acqua \u2014 emozioni, legami e intuizione. sentimenti, empatia, relazioni affettive, vita interiore, creativit\xE0 emotiva e connessione con se stessi e con gli altri.\n- **Luce/ombra**: Luce \u2014 immaginazione fertile, apertura a molte possibilit\xE0 creative prima di scegliere. Ombra \u2014 illusioni, confusione, dispersione tra fantasie irrealistiche, autoinganno.\n- **Domanda**: Quali sono i desideri reali e quali sono invece fantasie, proiezioni o paure mascherate da possibilit\xE0?"
  },
  {
    "id": "coppe-8",
    "suit": "coppe",
    "rank": "8",
    "title": "8 di Coppe",
    "aliases": [
      "8 di coppe",
      "8 coppe",
      "8 of coppe",
      "8 di coppa",
      "8 coppa",
      "8 of coppa",
      "8 di cups",
      "8 cups",
      "8 of cups",
      "8 di cup",
      "8 cup",
      "8 of cup",
      "otto di coppe",
      "otto coppe",
      "otto of coppe",
      "otto di coppa",
      "otto coppa",
      "otto of coppa",
      "otto di cups",
      "otto cups",
      "otto of cups",
      "otto di cup",
      "otto cup",
      "otto of cup",
      "eight di coppe",
      "eight coppe",
      "eight of coppe",
      "eight di coppa",
      "eight coppa",
      "eight of coppa",
      "eight di cups",
      "eight cups",
      "eight of cups",
      "eight di cup",
      "eight cup",
      "eight of cup"
    ],
    "body": "### 8 di Coppe\n- **Senso**: Coppe \u2014 acqua \u2014 emozioni, legami e intuizione. sentimenti, empatia, relazioni affettive, vita interiore, creativit\xE0 emotiva e connessione con se stessi e con gli altri.\n- **Luce/ombra**: Luce \u2014 coraggio di lasciare ci\xF2 che non ha pi\xF9 senso per cercare verit\xE0 e pienezza. Ombra \u2014 fuga dai problemi, rinuncia prematura, malinconia senza direzione chiara.\n- **Domanda**: Che cosa ho gi\xE0 capito non essere pi\xF9 sufficiente per me, anche se lasciarlo andare fa ancora male?"
  },
  {
    "id": "coppe-9",
    "suit": "coppe",
    "rank": "9",
    "title": "9 di Coppe",
    "aliases": [
      "9 di coppe",
      "9 coppe",
      "9 of coppe",
      "9 di coppa",
      "9 coppa",
      "9 of coppa",
      "9 di cups",
      "9 cups",
      "9 of cups",
      "9 di cup",
      "9 cup",
      "9 of cup",
      "nove di coppe",
      "nove coppe",
      "nove of coppe",
      "nove di coppa",
      "nove coppa",
      "nove of coppa",
      "nove di cups",
      "nove cups",
      "nove of cups",
      "nove di cup",
      "nove cup",
      "nove of cup",
      "nine di coppe",
      "nine coppe",
      "nine of coppe",
      "nine di coppa",
      "nine coppa",
      "nine of coppa",
      "nine di cups",
      "nine cups",
      "nine of cups",
      "nine di cup",
      "nine cup",
      "nine of cup"
    ],
    "body": '### 9 di Coppe\n- **Senso**: Coppe \u2014 acqua \u2014 emozioni, legami e intuizione. sentimenti, empatia, relazioni affettive, vita interiore, creativit\xE0 emotiva e connessione con se stessi e con gli altri.\n- **Luce/ombra**: Luce \u2014 appagamento emotivo, gratitudine, benessere personale, soddisfazione genuina. Ombra \u2014 autocompiacimento, edonismo fine a s\xE9 stesso, materialismo emotivo ("basta che stia bene io").\n- **Domanda**: In che cosa sento gi\xE0 una soddisfazione autentica e dove invece mi accontento di una gratificazione superficiale?'
  },
  {
    "id": "coppe-10",
    "suit": "coppe",
    "rank": "10",
    "title": "10 di Coppe",
    "aliases": [
      "10 di coppe",
      "10 coppe",
      "10 of coppe",
      "10 di coppa",
      "10 coppa",
      "10 of coppa",
      "10 di cups",
      "10 cups",
      "10 of cups",
      "10 di cup",
      "10 cup",
      "10 of cup",
      "dieci di coppe",
      "dieci coppe",
      "dieci of coppe",
      "dieci di coppa",
      "dieci coppa",
      "dieci of coppa",
      "dieci di cups",
      "dieci cups",
      "dieci of cups",
      "dieci di cup",
      "dieci cup",
      "dieci of cup",
      "ten di coppe",
      "ten coppe",
      "ten of coppe",
      "ten di coppa",
      "ten coppa",
      "ten of coppa",
      "ten di cups",
      "ten cups",
      "ten of cups",
      "ten di cup",
      "ten cup",
      "ten of cup"
    ],
    "body": "### 10 di Coppe\n- **Senso**: Coppe \u2014 acqua \u2014 emozioni, legami e intuizione. sentimenti, empatia, relazioni affettive, vita interiore, creativit\xE0 emotiva e connessione con se stessi e con gli altri.\n- **Luce/ombra**: Luce \u2014 armonia familiare o relazionale, pace duratura, senso di appartenenza e pienezza. Ombra \u2014 facciata perfetta che nasconde tensioni, idealizzazione forzata, paura del conflitto.\n- **Domanda**: Che idea di armonia o casa sto cercando e quanto \xE8 reale rispetto a un'immagine ideale?"
  },
  {
    "id": "coppe-fante",
    "suit": "coppe",
    "rank": "fante",
    "title": "Fante di Coppe",
    "aliases": [
      "fante di coppe",
      "fante coppe",
      "fante of coppe",
      "fante di coppa",
      "fante coppa",
      "fante of coppa",
      "fante di cups",
      "fante cups",
      "fante of cups",
      "fante di cup",
      "fante cup",
      "fante of cup",
      "page di coppe",
      "page coppe",
      "page of coppe",
      "page di coppa",
      "page coppa",
      "page of coppa",
      "page di cups",
      "page cups",
      "page of cups",
      "page di cup",
      "page cup",
      "page of cup",
      "paggio di coppe",
      "paggio coppe",
      "paggio of coppe",
      "paggio di coppa",
      "paggio coppa",
      "paggio of coppa",
      "paggio di cups",
      "paggio cups",
      "paggio of cups",
      "paggio di cup",
      "paggio cup",
      "paggio of cup"
    ],
    "body": "### Fante di Coppe\n- **Senso**: Coppe \u2014 acqua \u2014 emozioni, legami e intuizione. sentimenti, empatia, relazioni affettive, vita interiore, creativit\xE0 emotiva e connessione con se stessi e con gli altri.\n- **Luce/ombra**: Luce \u2014 sensibilit\xE0, gentilezza, immaginazione, apertura emotiva e creativit\xE0 nascente. Ombra \u2014 permalosit\xE0, perdersi nei sogni, ricerca continua di conferme affettive.\n- **Domanda**: Quale emozione sottile sto provando e come posso darle voce senza drammatizzarla n\xE9 zittirla?"
  },
  {
    "id": "coppe-cavallo",
    "suit": "coppe",
    "rank": "cavallo",
    "title": "Cavallo di Coppe",
    "aliases": [
      "cavallo di coppe",
      "cavallo coppe",
      "cavallo of coppe",
      "cavallo di coppa",
      "cavallo coppa",
      "cavallo of coppa",
      "cavallo di cups",
      "cavallo cups",
      "cavallo of cups",
      "cavallo di cup",
      "cavallo cup",
      "cavallo of cup",
      "knight di coppe",
      "knight coppe",
      "knight of coppe",
      "knight di coppa",
      "knight coppa",
      "knight of coppa",
      "knight di cups",
      "knight cups",
      "knight of cups",
      "knight di cup",
      "knight cup",
      "knight of cup",
      "cavaliere di coppe",
      "cavaliere coppe",
      "cavaliere of coppe",
      "cavaliere di coppa",
      "cavaliere coppa",
      "cavaliere of coppa",
      "cavaliere di cups",
      "cavaliere cups",
      "cavaliere of cups",
      "cavaliere di cup",
      "cavaliere cup",
      "cavaliere of cup"
    ],
    "body": "### Cavallo di Coppe\n- **Senso**: Coppe \u2014 acqua \u2014 emozioni, legami e intuizione. sentimenti, empatia, relazioni affettive, vita interiore, creativit\xE0 emotiva e connessione con se stessi e con gli altri.\n- **Luce/ombra**: Luce \u2014 romanticismo, idealismo, grazia, ascolto del cuore e proposta sincera. Ombra \u2014 volubilit\xE0 sentimentale, seduzione illusoria, fuga nella fantasia di fronte alla realt\xE0.\n- **Domanda**: Che storia romantica o ideale sto raccontando a me stesso e quanto regge alla prova dei fatti?"
  },
  {
    "id": "coppe-regina",
    "suit": "coppe",
    "rank": "regina",
    "title": "Regina di Coppe",
    "aliases": [
      "regina di coppe",
      "regina coppe",
      "regina of coppe",
      "regina di coppa",
      "regina coppa",
      "regina of coppa",
      "regina di cups",
      "regina cups",
      "regina of cups",
      "regina di cup",
      "regina cup",
      "regina of cup",
      "queen di coppe",
      "queen coppe",
      "queen of coppe",
      "queen di coppa",
      "queen coppa",
      "queen of coppa",
      "queen di cups",
      "queen cups",
      "queen of cups",
      "queen di cup",
      "queen cup",
      "queen of cup"
    ],
    "body": "### Regina di Coppe\n- **Senso**: Coppe \u2014 acqua \u2014 emozioni, legami e intuizione. sentimenti, empatia, relazioni affettive, vita interiore, creativit\xE0 emotiva e connessione con se stessi e con gli altri.\n- **Luce/ombra**: Luce \u2014 profonda empatia, intuizione raffinata, accoglienza, maturit\xE0 emotiva. Ombra \u2014 ipercoinvolgimento, manipolazione emotiva sottile, assorbimento dei pesi altrui fino a svuotarsi.\n- **Domanda**: Come posso ascoltare l'altro in profondit\xE0 senza assorbire i suoi pesi fino a svuotarmi?"
  },
  {
    "id": "coppe-re",
    "suit": "coppe",
    "rank": "re",
    "title": "Re di Coppe",
    "aliases": [
      "re di coppe",
      "re coppe",
      "re of coppe",
      "re di coppa",
      "re coppa",
      "re of coppa",
      "re di cups",
      "re cups",
      "re of cups",
      "re di cup",
      "re cup",
      "re of cup",
      "king di coppe",
      "king coppe",
      "king of coppe",
      "king di coppa",
      "king coppa",
      "king of coppa",
      "king di cups",
      "king cups",
      "king of cups",
      "king di cup",
      "king cup",
      "king of cup"
    ],
    "body": "### Re di Coppe\n- **Senso**: Coppe \u2014 acqua \u2014 emozioni, legami e intuizione. sentimenti, empatia, relazioni affettive, vita interiore, creativit\xE0 emotiva e connessione con se stessi e con gli altri.\n- **Luce/ombra**: Luce \u2014 equilibrio emotivo, compassione, calma interiore, guida affettiva sicura. Ombra \u2014 distacco emotivo mascherato, controllo delle emozioni, passivit\xE0 o freddezza sotto pressione.\n- **Domanda**: Che cosa mi serve per restare saldo e compassionevole quando le acque emotive si agitano?"
  },
  {
    "id": "spade-asso",
    "suit": "spade",
    "rank": "asso",
    "title": "Asso di Spade",
    "aliases": [
      "asso di spade",
      "asso spade",
      "asso of spade",
      "asso di spada",
      "asso spada",
      "asso of spada",
      "asso di swords",
      "asso swords",
      "asso of swords",
      "asso di sword",
      "asso sword",
      "asso of sword",
      "ace di spade",
      "ace spade",
      "ace of spade",
      "ace di spada",
      "ace spada",
      "ace of spada",
      "ace di swords",
      "ace swords",
      "ace of swords",
      "ace di sword",
      "ace sword",
      "ace of sword"
    ],
    "body": "### Asso di Spade\n- **Senso**: Spade \u2014 aria \u2014 pensiero, verit\xE0, parole e conflitto. mente, logica, linguaggio, decisioni, chiarezza; anche tensioni, preoccupazioni, tagli necessari e conflitti.\n- **Luce/ombra**: Luce \u2014 chiarezza mentale, verit\xE0 netta, intuizione acuta, decisione risolutiva, taglio del superfluo. Ombra \u2014 durezza verbale, eccesso di razionalit\xE0, giudizio spietato, pensieri che tagliano senza ascolto.\n- **Domanda**: Qual \xE8 la verit\xE0 semplice e netta che emerge se tolgo i giri di parole e le giustificazioni?"
  },
  {
    "id": "spade-2",
    "suit": "spade",
    "rank": "2",
    "title": "2 di Spade",
    "aliases": [
      "2 di spade",
      "2 spade",
      "2 of spade",
      "2 di spada",
      "2 spada",
      "2 of spada",
      "2 di swords",
      "2 swords",
      "2 of swords",
      "2 di sword",
      "2 sword",
      "2 of sword",
      "due di spade",
      "due spade",
      "due of spade",
      "due di spada",
      "due spada",
      "due of spada",
      "due di swords",
      "due swords",
      "due of swords",
      "due di sword",
      "due sword",
      "due of sword",
      "two di spade",
      "two spade",
      "two of spade",
      "two di spada",
      "two spada",
      "two of spada",
      "two di swords",
      "two swords",
      "two of swords",
      "two di sword",
      "two sword",
      "two of sword"
    ],
    "body": "### 2 di Spade\n- **Senso**: Spade \u2014 aria \u2014 pensiero, verit\xE0, parole e conflitto. mente, logica, linguaggio, decisioni, chiarezza; anche tensioni, preoccupazioni, tagli necessari e conflitti.\n- **Luce/ombra**: Luce \u2014 tregua, equilibrio apparente, sospensione del giudizio per non agire a caldo. Ombra \u2014 negazione evidente, stallo mentale, rifiuto di vedere una verit\xE0 scomoda.\n- **Domanda**: Che cosa sto tenendo in sospeso per non dover scegliere o guardare una realt\xE0 scomoda?"
  },
  {
    "id": "spade-3",
    "suit": "spade",
    "rank": "3",
    "title": "3 di Spade",
    "aliases": [
      "3 di spade",
      "3 spade",
      "3 of spade",
      "3 di spada",
      "3 spada",
      "3 of spada",
      "3 di swords",
      "3 swords",
      "3 of swords",
      "3 di sword",
      "3 sword",
      "3 of sword",
      "tre di spade",
      "tre spade",
      "tre of spade",
      "tre di spada",
      "tre spada",
      "tre of spada",
      "tre di swords",
      "tre swords",
      "tre of swords",
      "tre di sword",
      "tre sword",
      "tre of sword",
      "three di spade",
      "three spade",
      "three of spade",
      "three di spada",
      "three spada",
      "three of spada",
      "three di swords",
      "three swords",
      "three of swords",
      "three di sword",
      "three sword",
      "three of sword"
    ],
    "body": "### 3 di Spade\n- **Senso**: Spade \u2014 aria \u2014 pensiero, verit\xE0, parole e conflitto. mente, logica, linguaggio, decisioni, chiarezza; anche tensioni, preoccupazioni, tagli necessari e conflitti.\n- **Luce/ombra**: Luce \u2014 catarsi, dolore necessario che libera da un'illusione, onest\xE0 emotiva su una ferita. Ombra \u2014 rancore, drammatizzazione, restare ancorati alla sofferenza o ferire gli altri con le parole.\n- **Domanda**: Quale ferita o verit\xE0 bruciante chiede di essere riconosciuta con onest\xE0 per poter iniziare a guarire?"
  },
  {
    "id": "spade-4",
    "suit": "spade",
    "rank": "4",
    "title": "4 di Spade",
    "aliases": [
      "4 di spade",
      "4 spade",
      "4 of spade",
      "4 di spada",
      "4 spada",
      "4 of spada",
      "4 di swords",
      "4 swords",
      "4 of swords",
      "4 di sword",
      "4 sword",
      "4 of sword",
      "quattro di spade",
      "quattro spade",
      "quattro of spade",
      "quattro di spada",
      "quattro spada",
      "quattro of spada",
      "quattro di swords",
      "quattro swords",
      "quattro of swords",
      "quattro di sword",
      "quattro sword",
      "quattro of sword",
      "four di spade",
      "four spade",
      "four of spade",
      "four di spada",
      "four spada",
      "four of spada",
      "four di swords",
      "four swords",
      "four of swords",
      "four di sword",
      "four sword",
      "four of sword"
    ],
    "body": '### 4 di Spade\n- **Senso**: Spade \u2014 aria \u2014 pensiero, verit\xE0, parole e conflitto. mente, logica, linguaggio, decisioni, chiarezza; anche tensioni, preoccupazioni, tagli necessari e conflitti.\n- **Luce/ombra**: Luce \u2014 recupero mentale, riposo, silenzio rigenerante, pausa strategica. Ombra \u2014 immobilismo, evitamento mascherato da "pausa", isolamento mentale.\n- **Domanda**: Ho bisogno di un silenzio che rigeneri la mente o sto usando la pausa per rinviare una decisione?'
  },
  {
    "id": "spade-5",
    "suit": "spade",
    "rank": "5",
    "title": "5 di Spade",
    "aliases": [
      "5 di spade",
      "5 spade",
      "5 of spade",
      "5 di spada",
      "5 spada",
      "5 of spada",
      "5 di swords",
      "5 swords",
      "5 of swords",
      "5 di sword",
      "5 sword",
      "5 of sword",
      "cinque di spade",
      "cinque spade",
      "cinque of spade",
      "cinque di spada",
      "cinque spada",
      "cinque of spada",
      "cinque di swords",
      "cinque swords",
      "cinque of swords",
      "cinque di sword",
      "cinque sword",
      "cinque of sword",
      "five di spade",
      "five spade",
      "five of spade",
      "five di spada",
      "five spada",
      "five of spada",
      "five di swords",
      "five swords",
      "five of swords",
      "five di sword",
      "five sword",
      "five of sword"
    ],
    "body": "### 5 di Spade\n- **Senso**: Spade \u2014 aria \u2014 pensiero, verit\xE0, parole e conflitto. mente, logica, linguaggio, decisioni, chiarezza; anche tensioni, preoccupazioni, tagli necessari e conflitti.\n- **Luce/ombra**: Luce \u2014 presa d'atto dei rapporti di forza, consapevolezza di quando una battaglia non vale la pena. Ombra \u2014 vittoria a caro prezzo, slealt\xE0, umiliazione dell'altro, desiderio di rivalsa.\n- **Domanda**: Se vinco questo scontro, che cosa perdo davvero e ne vale la pena?"
  },
  {
    "id": "spade-6",
    "suit": "spade",
    "rank": "6",
    "title": "6 di Spade",
    "aliases": [
      "6 di spade",
      "6 spade",
      "6 of spade",
      "6 di spada",
      "6 spada",
      "6 of spada",
      "6 di swords",
      "6 swords",
      "6 of swords",
      "6 di sword",
      "6 sword",
      "6 of sword",
      "sei di spade",
      "sei spade",
      "sei of spade",
      "sei di spada",
      "sei spada",
      "sei of spada",
      "sei di swords",
      "sei swords",
      "sei of swords",
      "sei di sword",
      "sei sword",
      "sei of sword",
      "six di spade",
      "six spade",
      "six of spade",
      "six di spada",
      "six spada",
      "six of spada",
      "six di swords",
      "six swords",
      "six of swords",
      "six di sword",
      "six sword",
      "six of sword"
    ],
    "body": "### 6 di Spade\n- **Senso**: Spade \u2014 aria \u2014 pensiero, verit\xE0, parole e conflitto. mente, logica, linguaggio, decisioni, chiarezza; anche tensioni, preoccupazioni, tagli necessari e conflitti.\n- **Luce/ombra**: Luce \u2014 transizione verso acque pi\xF9 calme, allontanamento graduale da una situazione pesante. Ombra \u2014 strascichi emotivi del passato, difficolt\xE0 a voltare pagina davvero, fuga irrisolta.\n- **Domanda**: Qual \xE8 il passaggio graduale che mi porta da un clima pesante a uno pi\xF9 respirabile, anche se non \xE8 immediato?"
  },
  {
    "id": "spade-7",
    "suit": "spade",
    "rank": "7",
    "title": "7 di Spade",
    "aliases": [
      "7 di spade",
      "7 spade",
      "7 of spade",
      "7 di spada",
      "7 spada",
      "7 of spada",
      "7 di swords",
      "7 swords",
      "7 of swords",
      "7 di sword",
      "7 sword",
      "7 of sword",
      "sette di spade",
      "sette spade",
      "sette of spade",
      "sette di spada",
      "sette spada",
      "sette of spada",
      "sette di swords",
      "sette swords",
      "sette of swords",
      "sette di sword",
      "sette sword",
      "sette of sword",
      "seven di spade",
      "seven spade",
      "seven of spade",
      "seven di spada",
      "seven spada",
      "seven of spada",
      "seven di swords",
      "seven swords",
      "seven of swords",
      "seven di sword",
      "seven sword",
      "seven of sword"
    ],
    "body": "### 7 di Spade\n- **Senso**: Spade \u2014 aria \u2014 pensiero, verit\xE0, parole e conflitto. mente, logica, linguaggio, decisioni, chiarezza; anche tensioni, preoccupazioni, tagli necessari e conflitti.\n- **Luce/ombra**: Luce \u2014 astuzia, strategia discreta, tutela delle proprie mosse in contesti delicati. Ombra \u2014 inganno, sotterfugi, furbizia a danno di altri, omissioni o incoerenza.\n- **Domanda**: Dove sto nascondendo qualcosa a me stesso o agli altri per evitare un confronto diretto?"
  },
  {
    "id": "spade-8",
    "suit": "spade",
    "rank": "8",
    "title": "8 di Spade",
    "aliases": [
      "8 di spade",
      "8 spade",
      "8 of spade",
      "8 di spada",
      "8 spada",
      "8 of spada",
      "8 di swords",
      "8 swords",
      "8 of swords",
      "8 di sword",
      "8 sword",
      "8 of sword",
      "otto di spade",
      "otto spade",
      "otto of spade",
      "otto di spada",
      "otto spada",
      "otto of spada",
      "otto di swords",
      "otto swords",
      "otto of swords",
      "otto di sword",
      "otto sword",
      "otto of sword",
      "eight di spade",
      "eight spade",
      "eight of spade",
      "eight di spada",
      "eight spada",
      "eight of spada",
      "eight di swords",
      "eight swords",
      "eight of swords",
      "eight di sword",
      "eight sword",
      "eight of sword"
    ],
    "body": `### 8 di Spade
- **Senso**: Spade \u2014 aria \u2014 pensiero, verit\xE0, parole e conflitto. mente, logica, linguaggio, decisioni, chiarezza; anche tensioni, preoccupazioni, tagli necessari e conflitti.
- **Luce/ombra**: Luce \u2014 consapevolezza dei propri condizionamenti mentali, primo passo per sciogliere i blocchi. Ombra \u2014 senso di prigionia autoimposto, paura paralizzante, visione a tunnel ("non ho vie d'uscita").
- **Domanda**: Quali fili che mi legano sono fatti di ostacoli reali e quali invece di convinzioni che do per scontate?`
  },
  {
    "id": "spade-9",
    "suit": "spade",
    "rank": "9",
    "title": "9 di Spade",
    "aliases": [
      "9 di spade",
      "9 spade",
      "9 of spade",
      "9 di spada",
      "9 spada",
      "9 of spada",
      "9 di swords",
      "9 swords",
      "9 of swords",
      "9 di sword",
      "9 sword",
      "9 of sword",
      "nove di spade",
      "nove spade",
      "nove of spade",
      "nove di spada",
      "nove spada",
      "nove of spada",
      "nove di swords",
      "nove swords",
      "nove of swords",
      "nove di sword",
      "nove sword",
      "nove of sword",
      "nine di spade",
      "nine spade",
      "nine of spade",
      "nine di spada",
      "nine spada",
      "nine of spada",
      "nine di swords",
      "nine swords",
      "nine of swords",
      "nine di sword",
      "nine sword",
      "nine of sword"
    ],
    "body": "### 9 di Spade\n- **Senso**: Spade \u2014 aria \u2014 pensiero, verit\xE0, parole e conflitto. mente, logica, linguaggio, decisioni, chiarezza; anche tensioni, preoccupazioni, tagli necessari e conflitti.\n- **Luce/ombra**: Luce \u2014 lucidit\xE0 nel riconoscere che molte paure sono amplificate dalla mente notturna. Ombra \u2014 ansia, rimuginio notturno, senso di colpa o catastrofismo sproporzionato.\n- **Domanda**: Che cosa sta ingigantendo la mente soprattutto quando cala la stanchezza o la notte, rispetto a ci\xF2 che accade di giorno?"
  },
  {
    "id": "spade-10",
    "suit": "spade",
    "rank": "10",
    "title": "10 di Spade",
    "aliases": [
      "10 di spade",
      "10 spade",
      "10 of spade",
      "10 di spada",
      "10 spada",
      "10 of spada",
      "10 di swords",
      "10 swords",
      "10 of swords",
      "10 di sword",
      "10 sword",
      "10 of sword",
      "dieci di spade",
      "dieci spade",
      "dieci of spade",
      "dieci di spada",
      "dieci spada",
      "dieci of spada",
      "dieci di swords",
      "dieci swords",
      "dieci of swords",
      "dieci di sword",
      "dieci sword",
      "dieci of sword",
      "ten di spade",
      "ten spade",
      "ten of spade",
      "ten di spada",
      "ten spada",
      "ten of spada",
      "ten di swords",
      "ten swords",
      "ten of swords",
      "ten di sword",
      "ten sword",
      "ten of sword"
    ],
    "body": "### 10 di Spade\n- **Senso**: Spade \u2014 aria \u2014 pensiero, verit\xE0, parole e conflitto. mente, logica, linguaggio, decisioni, chiarezza; anche tensioni, preoccupazioni, tagli necessari e conflitti.\n- **Luce/ombra**: Luce \u2014 fine definitiva di un ciclo doloroso, punto pi\xF9 basso da cui pu\xF2 solo nascere un nuovo giorno. Ombra \u2014 senso di sconfitta totale, vittimismo, drammaticit\xE0 estrema, resistenza ad accettare la chiusura.\n- **Domanda**: Qual \xE8 la fase o la dinamica che \xE8 arrivata al capolinea e cosa diventa possibile proprio perch\xE9 finisce?"
  },
  {
    "id": "spade-fante",
    "suit": "spade",
    "rank": "fante",
    "title": "Fante di Spade",
    "aliases": [
      "fante di spade",
      "fante spade",
      "fante of spade",
      "fante di spada",
      "fante spada",
      "fante of spada",
      "fante di swords",
      "fante swords",
      "fante of swords",
      "fante di sword",
      "fante sword",
      "fante of sword",
      "page di spade",
      "page spade",
      "page of spade",
      "page di spada",
      "page spada",
      "page of spada",
      "page di swords",
      "page swords",
      "page of swords",
      "page di sword",
      "page sword",
      "page of sword",
      "paggio di spade",
      "paggio spade",
      "paggio of spade",
      "paggio di spada",
      "paggio spada",
      "paggio of spada",
      "paggio di swords",
      "paggio swords",
      "paggio of swords",
      "paggio di sword",
      "paggio sword",
      "paggio of sword"
    ],
    "body": "### Fante di Spade\n- **Senso**: Spade \u2014 aria \u2014 pensiero, verit\xE0, parole e conflitto. mente, logica, linguaggio, decisioni, chiarezza; anche tensioni, preoccupazioni, tagli necessari e conflitti.\n- **Luce/ombra**: Luce \u2014 vivacit\xE0 intellettuale, spirito d'osservazione, curiosit\xE0 critica, franchezza. Ombra \u2014 lingua tagliente, indiscrezione, polemica gratuita, impulsivit\xE0 verbale.\n- **Domanda**: Che cosa sto osservando con acume in questo momento e dove la mia lingua rischia di essere pi\xF9 tagliente del necessario?"
  },
  {
    "id": "spade-cavallo",
    "suit": "spade",
    "rank": "cavallo",
    "title": "Cavallo di Spade",
    "aliases": [
      "cavallo di spade",
      "cavallo spade",
      "cavallo of spade",
      "cavallo di spada",
      "cavallo spada",
      "cavallo of spada",
      "cavallo di swords",
      "cavallo swords",
      "cavallo of swords",
      "cavallo di sword",
      "cavallo sword",
      "cavallo of sword",
      "knight di spade",
      "knight spade",
      "knight of spade",
      "knight di spada",
      "knight spada",
      "knight of spada",
      "knight di swords",
      "knight swords",
      "knight of swords",
      "knight di sword",
      "knight sword",
      "knight of sword",
      "cavaliere di spade",
      "cavaliere spade",
      "cavaliere of spade",
      "cavaliere di spada",
      "cavaliere spada",
      "cavaliere of spada",
      "cavaliere di swords",
      "cavaliere swords",
      "cavaliere of swords",
      "cavaliere di sword",
      "cavaliere sword",
      "cavaliere of sword"
    ],
    "body": "### Cavallo di Spade\n- **Senso**: Spade \u2014 aria \u2014 pensiero, verit\xE0, parole e conflitto. mente, logica, linguaggio, decisioni, chiarezza; anche tensioni, preoccupazioni, tagli necessari e conflitti.\n- **Luce/ombra**: Luce \u2014 prontezza, determinazione, velocit\xE0 d'azione e di pensiero, coraggio intellettuale. Ombra \u2014 bruschezza, intolleranza, sferzate senza tatto, precipitazione mentale.\n- **Domanda**: Quale pensiero o confronto sto spingendo dritto in avanti senza verificare se sto ascoltando?"
  },
  {
    "id": "spade-regina",
    "suit": "spade",
    "rank": "regina",
    "title": "Regina di Spade",
    "aliases": [
      "regina di spade",
      "regina spade",
      "regina of spade",
      "regina di spada",
      "regina spada",
      "regina of spada",
      "regina di swords",
      "regina swords",
      "regina of swords",
      "regina di sword",
      "regina sword",
      "regina of sword",
      "queen di spade",
      "queen spade",
      "queen of spade",
      "queen di spada",
      "queen spada",
      "queen of spada",
      "queen di swords",
      "queen swords",
      "queen of swords",
      "queen di sword",
      "queen sword",
      "queen of sword"
    ],
    "body": "### Regina di Spade\n- **Senso**: Spade \u2014 aria \u2014 pensiero, verit\xE0, parole e conflitto. mente, logica, linguaggio, decisioni, chiarezza; anche tensioni, preoccupazioni, tagli necessari e conflitti.\n- **Luce/ombra**: Luce \u2014 lucidit\xE0, indipendenza di pensiero, onest\xE0 intellettuale, confini chiari e sobri. Ombra \u2014 cinismo, sarcasmo, freddezza affettiva, rigidit\xE0 o giudizio severo.\n- **Domanda**: Di quale chiarezza, confine o parola schietta ho bisogno ora senza scivolare nel cinismo?"
  },
  {
    "id": "spade-re",
    "suit": "spade",
    "rank": "re",
    "title": "Re di Spade",
    "aliases": [
      "re di spade",
      "re spade",
      "re of spade",
      "re di spada",
      "re spada",
      "re of spada",
      "re di swords",
      "re swords",
      "re of swords",
      "re di sword",
      "re sword",
      "re of sword",
      "king di spade",
      "king spade",
      "king of spade",
      "king di spada",
      "king spada",
      "king of spada",
      "king di swords",
      "king swords",
      "king of swords",
      "king di sword",
      "king sword",
      "king of sword"
    ],
    "body": "### Re di Spade\n- **Senso**: Spade \u2014 aria \u2014 pensiero, verit\xE0, parole e conflitto. mente, logica, linguaggio, decisioni, chiarezza; anche tensioni, preoccupazioni, tagli necessari e conflitti.\n- **Luce/ombra**: Luce \u2014 acume strategico, imparzialit\xE0, autorevolezza basata su criteri chiari e coerenza. Ombra \u2014 calcolo freddo, severit\xE0 eccessiva, controllo mentale, distanza emotiva.\n- **Domanda**: Quale criterio lucido e imparziale pu\xF2 guidare questa scelta al di l\xE0 dell'umore del momento?"
  },
  {
    "id": "denari-asso",
    "suit": "denari",
    "rank": "asso",
    "title": "Asso di Denari",
    "aliases": [
      "asso di denari",
      "asso denari",
      "asso of denari",
      "asso di denaro",
      "asso denaro",
      "asso of denaro",
      "asso di pentacoli",
      "asso pentacoli",
      "asso of pentacoli",
      "asso di pentacolo",
      "asso pentacolo",
      "asso of pentacolo",
      "asso di pentacles",
      "asso pentacles",
      "asso of pentacles",
      "asso di coins",
      "asso coins",
      "asso of coins",
      "asso di coin",
      "asso coin",
      "asso of coin",
      "ace di denari",
      "ace denari",
      "ace of denari",
      "ace di denaro",
      "ace denaro",
      "ace of denaro",
      "ace di pentacoli",
      "ace pentacoli",
      "ace of pentacoli",
      "ace di pentacolo",
      "ace pentacolo",
      "ace of pentacolo",
      "ace di pentacles",
      "ace pentacles",
      "ace of pentacles",
      "ace di coins",
      "ace coins",
      "ace of coins",
      "ace di coin",
      "ace coin",
      "ace of coin"
    ],
    "body": "### Asso di Denari\n- **Senso**: Denari \u2014 terra \u2014 concretezza, risorse, lavoro e corpo. materia, lavoro, denaro, tempo, salute/corpo, pazienza, costruzione duratura e valore concreto. (Anche detti Pentacoli.)\n- **Luce/ombra**: Luce \u2014 opportunit\xE0 concreta, seme fertile, stabilit\xE0 potenziale, progetto tangibile, radicamento. Ombra \u2014 avidit\xE0, attaccamento eccessivo al risultato materiale, occasione vista solo in termini economici.\n- **Domanda**: Qual \xE8 l'opportunit\xE0 concreta, piccola ma reale, su cui vale la pena piantare un seme oggi?"
  },
  {
    "id": "denari-2",
    "suit": "denari",
    "rank": "2",
    "title": "2 di Denari",
    "aliases": [
      "2 di denari",
      "2 denari",
      "2 of denari",
      "2 di denaro",
      "2 denaro",
      "2 of denaro",
      "2 di pentacoli",
      "2 pentacoli",
      "2 of pentacoli",
      "2 di pentacolo",
      "2 pentacolo",
      "2 of pentacolo",
      "2 di pentacles",
      "2 pentacles",
      "2 of pentacles",
      "2 di coins",
      "2 coins",
      "2 of coins",
      "2 di coin",
      "2 coin",
      "2 of coin",
      "due di denari",
      "due denari",
      "due of denari",
      "due di denaro",
      "due denaro",
      "due of denaro",
      "due di pentacoli",
      "due pentacoli",
      "due of pentacoli",
      "due di pentacolo",
      "due pentacolo",
      "due of pentacolo",
      "due di pentacles",
      "due pentacles",
      "due of pentacles",
      "due di coins",
      "due coins",
      "due of coins",
      "due di coin",
      "due coin",
      "due of coin",
      "two di denari",
      "two denari",
      "two of denari",
      "two di denaro",
      "two denaro",
      "two of denaro",
      "two di pentacoli",
      "two pentacoli",
      "two of pentacoli",
      "two di pentacolo",
      "two pentacolo",
      "two of pentacolo",
      "two di pentacles",
      "two pentacles",
      "two of pentacles",
      "two di coins",
      "two coins",
      "two of coins",
      "two di coin",
      "two coin",
      "two of coin"
    ],
    "body": "### 2 di Denari\n- **Senso**: Denari \u2014 terra \u2014 concretezza, risorse, lavoro e corpo. materia, lavoro, denaro, tempo, salute/corpo, pazienza, costruzione duratura e valore concreto. (Anche detti Pentacoli.)\n- **Luce/ombra**: Luce \u2014 flessibilit\xE0, adattabilit\xE0, gestione dinamica di pi\xF9 impegni o risorse con leggerezza. Ombra \u2014 disorganizzazione, giocoleria rischiosa, instabilit\xE0 per voler tenere troppi fili insieme.\n- **Domanda**: Come sto distribuendo tempo, energie e risorse tra i vari impegni e dove sto rischiando di perdere l'equilibrio?"
  },
  {
    "id": "denari-3",
    "suit": "denari",
    "rank": "3",
    "title": "3 di Denari",
    "aliases": [
      "3 di denari",
      "3 denari",
      "3 of denari",
      "3 di denaro",
      "3 denaro",
      "3 of denaro",
      "3 di pentacoli",
      "3 pentacoli",
      "3 of pentacoli",
      "3 di pentacolo",
      "3 pentacolo",
      "3 of pentacolo",
      "3 di pentacles",
      "3 pentacles",
      "3 of pentacles",
      "3 di coins",
      "3 coins",
      "3 of coins",
      "3 di coin",
      "3 coin",
      "3 of coin",
      "tre di denari",
      "tre denari",
      "tre of denari",
      "tre di denaro",
      "tre denaro",
      "tre of denaro",
      "tre di pentacoli",
      "tre pentacoli",
      "tre of pentacoli",
      "tre di pentacolo",
      "tre pentacolo",
      "tre of pentacolo",
      "tre di pentacles",
      "tre pentacles",
      "tre of pentacles",
      "tre di coins",
      "tre coins",
      "tre of coins",
      "tre di coin",
      "tre coin",
      "tre of coin",
      "three di denari",
      "three denari",
      "three of denari",
      "three di denaro",
      "three denaro",
      "three of denaro",
      "three di pentacoli",
      "three pentacoli",
      "three of pentacoli",
      "three di pentacolo",
      "three pentacolo",
      "three of pentacolo",
      "three di pentacles",
      "three pentacles",
      "three of pentacles",
      "three di coins",
      "three coins",
      "three of coins",
      "three di coin",
      "three coin",
      "three of coin"
    ],
    "body": "### 3 di Denari\n- **Senso**: Denari \u2014 terra \u2014 concretezza, risorse, lavoro e corpo. materia, lavoro, denaro, tempo, salute/corpo, pazienza, costruzione duratura e valore concreto. (Anche detti Pentacoli.)\n- **Luce/ombra**: Luce \u2014 competenza, artigianalit\xE0, collaborazione qualificata, apprendimento pratico e cura dei dettagli. Ombra \u2014 mediocrit\xE0, mancanza di coordinamento, ricerca di approvazione tecnica senza sostanza.\n- **Domanda**: Quale competenza o cura del dettaglio posso mettere in campo qui, e con chi ha senso costruire insieme?"
  },
  {
    "id": "denari-4",
    "suit": "denari",
    "rank": "4",
    "title": "4 di Denari",
    "aliases": [
      "4 di denari",
      "4 denari",
      "4 of denari",
      "4 di denaro",
      "4 denaro",
      "4 of denaro",
      "4 di pentacoli",
      "4 pentacoli",
      "4 of pentacoli",
      "4 di pentacolo",
      "4 pentacolo",
      "4 of pentacolo",
      "4 di pentacles",
      "4 pentacles",
      "4 of pentacles",
      "4 di coins",
      "4 coins",
      "4 of coins",
      "4 di coin",
      "4 coin",
      "4 of coin",
      "quattro di denari",
      "quattro denari",
      "quattro of denari",
      "quattro di denaro",
      "quattro denaro",
      "quattro of denaro",
      "quattro di pentacoli",
      "quattro pentacoli",
      "quattro of pentacoli",
      "quattro di pentacolo",
      "quattro pentacolo",
      "quattro of pentacolo",
      "quattro di pentacles",
      "quattro pentacles",
      "quattro of pentacles",
      "quattro di coins",
      "quattro coins",
      "quattro of coins",
      "quattro di coin",
      "quattro coin",
      "quattro of coin",
      "four di denari",
      "four denari",
      "four of denari",
      "four di denaro",
      "four denaro",
      "four of denaro",
      "four di pentacoli",
      "four pentacoli",
      "four of pentacoli",
      "four di pentacolo",
      "four pentacolo",
      "four of pentacolo",
      "four di pentacles",
      "four pentacles",
      "four of pentacles",
      "four di coins",
      "four coins",
      "four of coins",
      "four di coin",
      "four coin",
      "four of coin"
    ],
    "body": "### 4 di Denari\n- **Senso**: Denari \u2014 terra \u2014 concretezza, risorse, lavoro e corpo. materia, lavoro, denaro, tempo, salute/corpo, pazienza, costruzione duratura e valore concreto. (Anche detti Pentacoli.)\n- **Luce/ombra**: Luce \u2014 prudenza, risparmio, tutela delle risorse, solidit\xE0 e conservazione intelligente. Ombra \u2014 avarizia, paura di perdere, rigidit\xE0, trattenere ci\xF2 che andrebbe lasciato fluire.\n- **Domanda**: Che cosa sto trattenendo per paura di perdere e che cosa succederebbe se allentassi leggermente la presa?"
  },
  {
    "id": "denari-5",
    "suit": "denari",
    "rank": "5",
    "title": "5 di Denari",
    "aliases": [
      "5 di denari",
      "5 denari",
      "5 of denari",
      "5 di denaro",
      "5 denaro",
      "5 of denaro",
      "5 di pentacoli",
      "5 pentacoli",
      "5 of pentacoli",
      "5 di pentacolo",
      "5 pentacolo",
      "5 of pentacolo",
      "5 di pentacles",
      "5 pentacles",
      "5 of pentacles",
      "5 di coins",
      "5 coins",
      "5 of coins",
      "5 di coin",
      "5 coin",
      "5 of coin",
      "cinque di denari",
      "cinque denari",
      "cinque of denari",
      "cinque di denaro",
      "cinque denaro",
      "cinque of denaro",
      "cinque di pentacoli",
      "cinque pentacoli",
      "cinque of pentacoli",
      "cinque di pentacolo",
      "cinque pentacolo",
      "cinque of pentacolo",
      "cinque di pentacles",
      "cinque pentacles",
      "cinque of pentacles",
      "cinque di coins",
      "cinque coins",
      "cinque of coins",
      "cinque di coin",
      "cinque coin",
      "cinque of coin",
      "five di denari",
      "five denari",
      "five of denari",
      "five di denaro",
      "five denaro",
      "five of denaro",
      "five di pentacoli",
      "five pentacoli",
      "five of pentacoli",
      "five di pentacolo",
      "five pentacolo",
      "five of pentacolo",
      "five di pentacles",
      "five pentacles",
      "five of pentacles",
      "five di coins",
      "five coins",
      "five of coins",
      "five di coin",
      "five coin",
      "five of coin"
    ],
    "body": "### 5 di Denari\n- **Senso**: Denari \u2014 terra \u2014 concretezza, risorse, lavoro e corpo. materia, lavoro, denaro, tempo, salute/corpo, pazienza, costruzione duratura e valore concreto. (Anche detti Pentacoli.)\n- **Luce/ombra**: Luce \u2014 solidariet\xE0 nei momenti difficili, consapevolezza delle priorit\xE0 essenziali, richiesta d'aiuto. Ombra \u2014 senso di esclusione o scarsit\xE0, isolamento materiale o emotivo, non vedere l'aiuto disponibile.\n- **Domanda**: Dove sento mancanza o isolamento e quale aiuto o risorsa concreta \xE8 gi\xE0 vicino ma non sto considerando?"
  },
  {
    "id": "denari-6",
    "suit": "denari",
    "rank": "6",
    "title": "6 di Denari",
    "aliases": [
      "6 di denari",
      "6 denari",
      "6 of denari",
      "6 di denaro",
      "6 denaro",
      "6 of denaro",
      "6 di pentacoli",
      "6 pentacoli",
      "6 of pentacoli",
      "6 di pentacolo",
      "6 pentacolo",
      "6 of pentacolo",
      "6 di pentacles",
      "6 pentacles",
      "6 of pentacles",
      "6 di coins",
      "6 coins",
      "6 of coins",
      "6 di coin",
      "6 coin",
      "6 of coin",
      "sei di denari",
      "sei denari",
      "sei of denari",
      "sei di denaro",
      "sei denaro",
      "sei of denaro",
      "sei di pentacoli",
      "sei pentacoli",
      "sei of pentacoli",
      "sei di pentacolo",
      "sei pentacolo",
      "sei of pentacolo",
      "sei di pentacles",
      "sei pentacles",
      "sei of pentacles",
      "sei di coins",
      "sei coins",
      "sei of coins",
      "sei di coin",
      "sei coin",
      "sei of coin",
      "six di denari",
      "six denari",
      "six of denari",
      "six di denaro",
      "six denaro",
      "six of denaro",
      "six di pentacoli",
      "six pentacoli",
      "six of pentacoli",
      "six di pentacolo",
      "six pentacolo",
      "six of pentacolo",
      "six di pentacles",
      "six pentacles",
      "six of pentacles",
      "six di coins",
      "six coins",
      "six of coins",
      "six di coin",
      "six coin",
      "six of coin"
    ],
    "body": "### 6 di Denari\n- **Senso**: Denari \u2014 terra \u2014 concretezza, risorse, lavoro e corpo. materia, lavoro, denaro, tempo, salute/corpo, pazienza, costruzione duratura e valore concreto. (Anche detti Pentacoli.)\n- **Luce/ombra**: Luce \u2014 generosit\xE0 equilibrata, scambio equo, supporto concreto, condivisione sana delle risorse. Ombra \u2014 dare con condizionamenti, senso di superiorit\xE0 del benefattore, squilibrio tra dare e avere.\n- **Domanda**: Com'\xE8 l'equilibrio tra dare e ricevere in questa situazione: c'\xE8 scambio vivo o c'\xE8 un debito nascosto?"
  },
  {
    "id": "denari-7",
    "suit": "denari",
    "rank": "7",
    "title": "7 di Denari",
    "aliases": [
      "7 di denari",
      "7 denari",
      "7 of denari",
      "7 di denaro",
      "7 denaro",
      "7 of denaro",
      "7 di pentacoli",
      "7 pentacoli",
      "7 of pentacoli",
      "7 di pentacolo",
      "7 pentacolo",
      "7 of pentacolo",
      "7 di pentacles",
      "7 pentacles",
      "7 of pentacles",
      "7 di coins",
      "7 coins",
      "7 of coins",
      "7 di coin",
      "7 coin",
      "7 of coin",
      "sette di denari",
      "sette denari",
      "sette of denari",
      "sette di denaro",
      "sette denaro",
      "sette of denaro",
      "sette di pentacoli",
      "sette pentacoli",
      "sette of pentacoli",
      "sette di pentacolo",
      "sette pentacolo",
      "sette of pentacolo",
      "sette di pentacles",
      "sette pentacles",
      "sette of pentacles",
      "sette di coins",
      "sette coins",
      "sette of coins",
      "sette di coin",
      "sette coin",
      "sette of coin",
      "seven di denari",
      "seven denari",
      "seven of denari",
      "seven di denaro",
      "seven denaro",
      "seven of denaro",
      "seven di pentacoli",
      "seven pentacoli",
      "seven of pentacoli",
      "seven di pentacolo",
      "seven pentacolo",
      "seven of pentacolo",
      "seven di pentacles",
      "seven pentacles",
      "seven of pentacles",
      "seven di coins",
      "seven coins",
      "seven of coins",
      "seven di coin",
      "seven coin",
      "seven of coin"
    ],
    "body": "### 7 di Denari\n- **Senso**: Denari \u2014 terra \u2014 concretezza, risorse, lavoro e corpo. materia, lavoro, denaro, tempo, salute/corpo, pazienza, costruzione duratura e valore concreto. (Anche detti Pentacoli.)\n- **Luce/ombra**: Luce \u2014 pazienza, valutazione oggettiva del raccolto fin qui, investimento a medio-lungo termine. Ombra \u2014 scoraggiamento per i tempi lenti, impazienza, sensazione che lo sforzo non basti mai.\n- **Domanda**: Che cosa ha bisogno di tempo per maturare e dove invece sto misurando troppo presto un raccolto ancora acerbo?"
  },
  {
    "id": "denari-8",
    "suit": "denari",
    "rank": "8",
    "title": "8 di Denari",
    "aliases": [
      "8 di denari",
      "8 denari",
      "8 of denari",
      "8 di denaro",
      "8 denaro",
      "8 of denaro",
      "8 di pentacoli",
      "8 pentacoli",
      "8 of pentacoli",
      "8 di pentacolo",
      "8 pentacolo",
      "8 of pentacolo",
      "8 di pentacles",
      "8 pentacles",
      "8 of pentacles",
      "8 di coins",
      "8 coins",
      "8 of coins",
      "8 di coin",
      "8 coin",
      "8 of coin",
      "otto di denari",
      "otto denari",
      "otto of denari",
      "otto di denaro",
      "otto denaro",
      "otto of denaro",
      "otto di pentacoli",
      "otto pentacoli",
      "otto of pentacoli",
      "otto di pentacolo",
      "otto pentacolo",
      "otto of pentacolo",
      "otto di pentacles",
      "otto pentacles",
      "otto of pentacles",
      "otto di coins",
      "otto coins",
      "otto of coins",
      "otto di coin",
      "otto coin",
      "otto of coin",
      "eight di denari",
      "eight denari",
      "eight of denari",
      "eight di denaro",
      "eight denaro",
      "eight of denaro",
      "eight di pentacoli",
      "eight pentacoli",
      "eight of pentacoli",
      "eight di pentacolo",
      "eight pentacolo",
      "eight of pentacolo",
      "eight di pentacles",
      "eight pentacles",
      "eight of pentacles",
      "eight di coins",
      "eight coins",
      "eight of coins",
      "eight di coin",
      "eight coin",
      "eight of coin"
    ],
    "body": "### 8 di Denari\n- **Senso**: Denari \u2014 terra \u2014 concretezza, risorse, lavoro e corpo. materia, lavoro, denaro, tempo, salute/corpo, pazienza, costruzione duratura e valore concreto. (Anche detti Pentacoli.)\n- **Luce/ombra**: Luce \u2014 dedizione, pratica costante, miglioramento continuo, attenzione al mestiere. Ombra \u2014 perfezionismo bloccante, ripetitivit\xE0 alienante, lavoro ossessivo a scapito del resto.\n- **Domanda**: Qual \xE8 il lavoro quotidiano, la pratica o il dettaglio che migliora davvero se ci torno con costanza?"
  },
  {
    "id": "denari-9",
    "suit": "denari",
    "rank": "9",
    "title": "9 di Denari",
    "aliases": [
      "9 di denari",
      "9 denari",
      "9 of denari",
      "9 di denaro",
      "9 denaro",
      "9 of denaro",
      "9 di pentacoli",
      "9 pentacoli",
      "9 of pentacoli",
      "9 di pentacolo",
      "9 pentacolo",
      "9 of pentacolo",
      "9 di pentacles",
      "9 pentacles",
      "9 of pentacles",
      "9 di coins",
      "9 coins",
      "9 of coins",
      "9 di coin",
      "9 coin",
      "9 of coin",
      "nove di denari",
      "nove denari",
      "nove of denari",
      "nove di denaro",
      "nove denaro",
      "nove of denaro",
      "nove di pentacoli",
      "nove pentacoli",
      "nove of pentacoli",
      "nove di pentacolo",
      "nove pentacolo",
      "nove of pentacolo",
      "nove di pentacles",
      "nove pentacles",
      "nove of pentacles",
      "nove di coins",
      "nove coins",
      "nove of coins",
      "nove di coin",
      "nove coin",
      "nove of coin",
      "nine di denari",
      "nine denari",
      "nine of denari",
      "nine di denaro",
      "nine denaro",
      "nine of denaro",
      "nine di pentacoli",
      "nine pentacoli",
      "nine of pentacoli",
      "nine di pentacolo",
      "nine pentacolo",
      "nine of pentacolo",
      "nine di pentacles",
      "nine pentacles",
      "nine of pentacles",
      "nine di coins",
      "nine coins",
      "nine of coins",
      "nine di coin",
      "nine coin",
      "nine of coin"
    ],
    "body": "### 9 di Denari\n- **Senso**: Denari \u2014 terra \u2014 concretezza, risorse, lavoro e corpo. materia, lavoro, denaro, tempo, salute/corpo, pazienza, costruzione duratura e valore concreto. (Anche detti Pentacoli.)\n- **Luce/ombra**: Luce \u2014 autonomia materiale, agio meritato, cura di s\xE9, raffinatezza e autosufficienza. Ombra \u2014 solitudine dorata, snobismo, difficolt\xE0 a lasciarsi aiutare o a condividere.\n- **Domanda**: In che cosa ho gi\xE0 costruito autonomia e cura di me, e dove invece mi isolo per non dipendere da nessuno?"
  },
  {
    "id": "denari-10",
    "suit": "denari",
    "rank": "10",
    "title": "10 di Denari",
    "aliases": [
      "10 di denari",
      "10 denari",
      "10 of denari",
      "10 di denaro",
      "10 denaro",
      "10 of denaro",
      "10 di pentacoli",
      "10 pentacoli",
      "10 of pentacoli",
      "10 di pentacolo",
      "10 pentacolo",
      "10 of pentacolo",
      "10 di pentacles",
      "10 pentacles",
      "10 of pentacles",
      "10 di coins",
      "10 coins",
      "10 of coins",
      "10 di coin",
      "10 coin",
      "10 of coin",
      "dieci di denari",
      "dieci denari",
      "dieci of denari",
      "dieci di denaro",
      "dieci denaro",
      "dieci of denaro",
      "dieci di pentacoli",
      "dieci pentacoli",
      "dieci of pentacoli",
      "dieci di pentacolo",
      "dieci pentacolo",
      "dieci of pentacolo",
      "dieci di pentacles",
      "dieci pentacles",
      "dieci of pentacles",
      "dieci di coins",
      "dieci coins",
      "dieci of coins",
      "dieci di coin",
      "dieci coin",
      "dieci of coin",
      "ten di denari",
      "ten denari",
      "ten of denari",
      "ten di denaro",
      "ten denaro",
      "ten of denaro",
      "ten di pentacoli",
      "ten pentacoli",
      "ten of pentacoli",
      "ten di pentacolo",
      "ten pentacolo",
      "ten of pentacolo",
      "ten di pentacles",
      "ten pentacles",
      "ten of pentacles",
      "ten di coins",
      "ten coins",
      "ten of coins",
      "ten di coin",
      "ten coin",
      "ten of coin"
    ],
    "body": "### 10 di Denari\n- **Senso**: Denari \u2014 terra \u2014 concretezza, risorse, lavoro e corpo. materia, lavoro, denaro, tempo, salute/corpo, pazienza, costruzione duratura e valore concreto. (Anche detti Pentacoli.)\n- **Luce/ombra**: Luce \u2014 prosperit\xE0 duratura, eredit\xE0 materiale o familiare, solidit\xE0 transgenerazionale, stabilit\xE0. Ombra \u2014 peso delle aspettative familiari, attaccamento al patrimonio, conflitti su denaro o eredit\xE0.\n- **Domanda**: Che cosa sto costruendo che abbia valore nel tempo e quali regole o aspettative familiari sento ancora addosso?"
  },
  {
    "id": "denari-fante",
    "suit": "denari",
    "rank": "fante",
    "title": "Fante di Denari",
    "aliases": [
      "fante di denari",
      "fante denari",
      "fante of denari",
      "fante di denaro",
      "fante denaro",
      "fante of denaro",
      "fante di pentacoli",
      "fante pentacoli",
      "fante of pentacoli",
      "fante di pentacolo",
      "fante pentacolo",
      "fante of pentacolo",
      "fante di pentacles",
      "fante pentacles",
      "fante of pentacles",
      "fante di coins",
      "fante coins",
      "fante of coins",
      "fante di coin",
      "fante coin",
      "fante of coin",
      "page di denari",
      "page denari",
      "page of denari",
      "page di denaro",
      "page denaro",
      "page of denaro",
      "page di pentacoli",
      "page pentacoli",
      "page of pentacoli",
      "page di pentacolo",
      "page pentacolo",
      "page of pentacolo",
      "page di pentacles",
      "page pentacles",
      "page of pentacles",
      "page di coins",
      "page coins",
      "page of coins",
      "page di coin",
      "page coin",
      "page of coin",
      "paggio di denari",
      "paggio denari",
      "paggio of denari",
      "paggio di denaro",
      "paggio denaro",
      "paggio of denaro",
      "paggio di pentacoli",
      "paggio pentacoli",
      "paggio of pentacoli",
      "paggio di pentacolo",
      "paggio pentacolo",
      "paggio of pentacolo",
      "paggio di pentacles",
      "paggio pentacles",
      "paggio of pentacles",
      "paggio di coins",
      "paggio coins",
      "paggio of coins",
      "paggio di coin",
      "paggio coin",
      "paggio of coin"
    ],
    "body": "### Fante di Denari\n- **Senso**: Denari \u2014 terra \u2014 concretezza, risorse, lavoro e corpo. materia, lavoro, denaro, tempo, salute/corpo, pazienza, costruzione duratura e valore concreto. (Anche detti Pentacoli.)\n- **Luce/ombra**: Luce \u2014 concretezza, voglia di imparare un mestiere, affidabilit\xE0, passo prudente ma reale. Ombra \u2014 lentezza eccessiva, materialismo ingenuo, scarsa visione d'insieme.\n- **Domanda**: Qual \xE8 il primo passo pratico, semplice e verificabile che posso fare gi\xE0 da oggi?"
  },
  {
    "id": "denari-cavallo",
    "suit": "denari",
    "rank": "cavallo",
    "title": "Cavallo di Denari",
    "aliases": [
      "cavallo di denari",
      "cavallo denari",
      "cavallo of denari",
      "cavallo di denaro",
      "cavallo denaro",
      "cavallo of denaro",
      "cavallo di pentacoli",
      "cavallo pentacoli",
      "cavallo of pentacoli",
      "cavallo di pentacolo",
      "cavallo pentacolo",
      "cavallo of pentacolo",
      "cavallo di pentacles",
      "cavallo pentacles",
      "cavallo of pentacles",
      "cavallo di coins",
      "cavallo coins",
      "cavallo of coins",
      "cavallo di coin",
      "cavallo coin",
      "cavallo of coin",
      "knight di denari",
      "knight denari",
      "knight of denari",
      "knight di denaro",
      "knight denaro",
      "knight of denaro",
      "knight di pentacoli",
      "knight pentacoli",
      "knight of pentacoli",
      "knight di pentacolo",
      "knight pentacolo",
      "knight of pentacolo",
      "knight di pentacles",
      "knight pentacles",
      "knight of pentacles",
      "knight di coins",
      "knight coins",
      "knight of coins",
      "knight di coin",
      "knight coin",
      "knight of coin",
      "cavaliere di denari",
      "cavaliere denari",
      "cavaliere of denari",
      "cavaliere di denaro",
      "cavaliere denaro",
      "cavaliere of denaro",
      "cavaliere di pentacoli",
      "cavaliere pentacoli",
      "cavaliere of pentacoli",
      "cavaliere di pentacolo",
      "cavaliere pentacolo",
      "cavaliere of pentacolo",
      "cavaliere di pentacles",
      "cavaliere pentacles",
      "cavaliere of pentacles",
      "cavaliere di coins",
      "cavaliere coins",
      "cavaliere of coins",
      "cavaliere di coin",
      "cavaliere coin",
      "cavaliere of coin"
    ],
    "body": "### Cavallo di Denari\n- **Senso**: Denari \u2014 terra \u2014 concretezza, risorse, lavoro e corpo. materia, lavoro, denaro, tempo, salute/corpo, pazienza, costruzione duratura e valore concreto. (Anche detti Pentacoli.)\n- **Luce/ombra**: Luce \u2014 costanza, metodo, affidabilit\xE0, impegno regolare e resistente alla fatica. Ombra \u2014 testardaggine, routine rigida, lentezza che frena il cambiamento necessario.\n- **Domanda**: Quale costanza paziente mi serve ora e dove invece la routine rischia di diventare rigidit\xE0?"
  },
  {
    "id": "denari-regina",
    "suit": "denari",
    "rank": "regina",
    "title": "Regina di Denari",
    "aliases": [
      "regina di denari",
      "regina denari",
      "regina of denari",
      "regina di denaro",
      "regina denaro",
      "regina of denaro",
      "regina di pentacoli",
      "regina pentacoli",
      "regina of pentacoli",
      "regina di pentacolo",
      "regina pentacolo",
      "regina of pentacolo",
      "regina di pentacles",
      "regina pentacles",
      "regina of pentacles",
      "regina di coins",
      "regina coins",
      "regina of coins",
      "regina di coin",
      "regina coin",
      "regina of coin",
      "queen di denari",
      "queen denari",
      "queen of denari",
      "queen di denaro",
      "queen denaro",
      "queen of denaro",
      "queen di pentacoli",
      "queen pentacoli",
      "queen of pentacoli",
      "queen di pentacolo",
      "queen pentacolo",
      "queen of pentacolo",
      "queen di pentacles",
      "queen pentacles",
      "queen of pentacles",
      "queen di coins",
      "queen coins",
      "queen of coins",
      "queen di coin",
      "queen coin",
      "queen of coin"
    ],
    "body": "### Regina di Denari\n- **Senso**: Denari \u2014 terra \u2014 concretezza, risorse, lavoro e corpo. materia, lavoro, denaro, tempo, salute/corpo, pazienza, costruzione duratura e valore concreto. (Anche detti Pentacoli.)\n- **Luce/ombra**: Luce \u2014 concretezza accogliente, senso pratico, cura del corpo e degli spazi, realismo saggio. Ombra \u2014 ipercontrollo domestico o economico, sacrificio di s\xE9 per il dovere, ansia per la sicurezza.\n- **Domanda**: Come posso prendermi cura del mio corpo, dei miei spazi e delle mie risorse in modo concreto e accogliente?"
  },
  {
    "id": "denari-re",
    "suit": "denari",
    "rank": "re",
    "title": "Re di Denari",
    "aliases": [
      "re di denari",
      "re denari",
      "re of denari",
      "re di denaro",
      "re denaro",
      "re of denaro",
      "re di pentacoli",
      "re pentacoli",
      "re of pentacoli",
      "re di pentacolo",
      "re pentacolo",
      "re of pentacolo",
      "re di pentacles",
      "re pentacles",
      "re of pentacles",
      "re di coins",
      "re coins",
      "re of coins",
      "re di coin",
      "re coin",
      "re of coin",
      "king di denari",
      "king denari",
      "king of denari",
      "king di denaro",
      "king denaro",
      "king of denaro",
      "king di pentacoli",
      "king pentacoli",
      "king of pentacoli",
      "king di pentacolo",
      "king pentacolo",
      "king of pentacolo",
      "king di pentacles",
      "king pentacles",
      "king of pentacles",
      "king di coins",
      "king coins",
      "king of coins",
      "king di coin",
      "king coin",
      "king of coin"
    ],
    "body": "### Re di Denari\n- **Senso**: Denari \u2014 terra \u2014 concretezza, risorse, lavoro e corpo. materia, lavoro, denaro, tempo, salute/corpo, pazienza, costruzione duratura e valore concreto. (Anche detti Pentacoli.)\n- **Luce/ombra**: Luce \u2014 solidit\xE0, capacit\xE0 imprenditoriale o gestionale, affidabilit\xE0, prosperit\xE0 ben amministrata. Ombra \u2014 accumulo fine a s\xE9 stesso, rigidit\xE0 pragmatica, misurare ogni valore solo in cifre o risultati.\n- **Domanda**: Come posso amministrare con solidit\xE0 e realismo ci\xF2 che ho in mano, senza ridurre tutto a un calcolo?"
  }
];

// src/lib/ninaReplyLang.ts
var SOFT_LOCK_IT = `Quella domanda entra nello **studio didattico dei tarocchi** (Maggiori e Minori: simbologia, senso, luce/ombra, pratica).

Qui in **accoglienza** ti oriento su prezzi, prenotazione WhatsApp, mappa del sito e Chi sono \u2014 senza le schede profonde di Studio.

**Nina Studio** accompagna lo studente a svelare **tutto il mondo dei tarocchi**. Si sblocca con l\u2019acquisto del corso **Arcani Maggiori** (stesso accesso dell\u2019Area Riservata e del blog riservato). Trovi i percorsi su **Corsi** (/corsi).

Per un consulto personale con Maria Teresa, usa **Parla con Maria Teresa** qui sotto.`;
function ninaStudioSoftLockReply(_lang) {
  void _lang;
  return SOFT_LOCK_IT;
}
var GATE_IT = {
  studioAuth: "Per Nina Studio accedi con Google (stesso account dell\u2019Area Riservata).",
  studioLocked: "Nina Studio accompagna lo studio di tutto il mondo dei tarocchi. Si sblocca con l\u2019acquisto del corso Arcani Maggiori (stesso accesso dell\u2019Area Riservata). Apri Corsi.",
  studioLockedDemo: "Nina Studio \xE8 riservata a chi ha accesso Corsi (Arcani Maggiori). Apri Corsi.",
  studioEntitlement: "Non riesco a verificare l\u2019accesso a Nina Studio in questo momento. Riprova tra poco oppure apri l\u2019Area Riservata."
};
function ninaStudioGateCopy(_lang) {
  void _lang;
  return GATE_IT;
}
var UNCLEAR_IT = `Non sono sicura di aver colto bene la tua domanda.

Puoi **riformularla** in modo pi\xF9 chiaro, oppure **specificare l\u2019Arcano** o il tema (prezzi, prenotazione, Chi sono)? Cos\xEC ti rispondo con pi\xF9 precisione.

Per un consulto personale resta **Parla con Maria Teresa** qui sotto.`;
function ninaUnclearIntentReply(_lang) {
  void _lang;
  return UNCLEAR_IT;
}
var OUTAGE_IT = {
  unavailable: "Nina non \xE8 attiva in questo momento. Puoi scrivere a Maria Teresa su WhatsApp, Telegram o email.",
  temporary: "In questo momento non riesco a risponderti con serenit\xE0. Riprova tra poco oppure usa WhatsApp, Telegram o email.",
  // ENN-236: rare fallback after payload hard-caps — do not nudge “domanda più breve”.
  tooBroad: "In questo momento non riesco a elaborare la risposta con serenit\xE0. **Riprova tra poco** oppure usa WhatsApp, Telegram o email. Se vuoi, puoi anche nominare un Arcano o un tema preciso."
};
function ninaSoftOutageCopy(_lang) {
  void _lang;
  return OUTAGE_IT;
}
function looksLikeNinaProviderLeak(text2) {
  const raw = text2.trim();
  if (!raw) return true;
  const lower = raw.toLowerCase();
  return /\bgroq\b/.test(lower) || /\bgrok\b/.test(lower) || /tarotitaliachatgenericagroq/.test(lower) || /api[_ -]?key/.test(lower) || /openai\/gpt/.test(lower) || /problema con (groq|grok)/.test(lower);
}

// src/lib/ninaChatKnowledge.ts
var CONSULT_PRICE_LIST = consultationTariffs.map((t) => `\u20AC${t.priceEur}`).join(" / ");
var NINA_CHAT_SITE_KNOWLEDGE = `Conoscenza ufficiale del sito (fonte: copy pubblico Tarot Italia \u2014 usa SOLO questi fatti; stile FAQ breve e caldo; per prezzi e FAQ cita le risposte qui sotto, senza inventare):

## Consulti \u2014 introduzione ufficiale
Quattro durate calibrate per profondit\xE0 differenti. In ogni sessione leggo Arcani Maggiori e Minori: online in chiamata vocale riservata, oppure di persona a Macerata (Via Crispi 37) su appuntamento \u2014 il Consulto Breve \xE8 solo online (chiamata vocale WhatsApp).

Accoglienza: Che tu arrivi con una domanda immediata e sincera \u2014 anche semplice o legata agli affetti, come \xABMi pensa?\xBB \u2014 o con il bisogno di fare chiarezza su un passaggio complesso, i miei consulti nascono per trasformare il caos in cosmos. Integro la lettura viva della cartomanzia pura con la tarologia evolutiva attraverso tutti i 78 Arcani, Maggiori e Minori.

Non \xE8 richiesta alcuna conoscenza preliminare delle carte: ti guido passo dopo passo tra archetipi, motivazioni e chiavi di lettura pratiche perch\xE9 tu possa uscire con una visione rinnovata e riprendere in mano le redini del tuo percorso. I consulti online si svolgono esclusivamente in modalit\xE0 chiamata vocale, per favorire ascolto profondo e concentrazione.

Etica consulti: ogni consulto offre una lettura chiara del presente e delle tendenze future nel rispetto del libero arbitrio. Nessuna promessa miracolistica o sostituzione di pareri medici e legali.

## Tariffe consulti (prezzi correnti, EUR, IVA inclusa)
In **ogni** sessione Maria Teresa legge **Arcani Maggiori e Minori**.
Quando elenchi le tariffe in chat, usa SEMPRE un elenco markdown con **una riga per voce** (mai un paragrafo unico con trattini):

${formatConsultTariffsMarkdownList()}

Dettaglio (usa solo se chiesto; in elenco resta una riga per voce):
${formatConsultTariffsMarkdownDetails()}

## Modalit\xE0, orari e sedute (Europe/Rome)
- Slot pubblici tipici: dalle 09:00 alle 20:00.
- Online = chiamata vocale riservata (WhatsApp).
- Di persona: Via Crispi 37, 62100 Macerata, su appuntamento \u2014 disponibili fino alle 18:00; **dalle 19:00 solo online**.
- Il **Consulto Breve** non \xE8 disponibile di persona (solo chiamata vocale WhatsApp).

## Prenotazione e pagamento (copy Prenota)
Scegli durata, giorno e orario: in ogni sessione Maria Teresa legge Arcani Maggiori e Minori. Paga online con Stripe Checkout sul sito; il consulto si svolge su WhatsApp. Il Consulto Breve \xE8 solo online.

- Contatti pubblici: WhatsApp / Telegram / telefono 379 103 82 53 \xB7 email info@tarotitalia.com.
- Checkout Stripe attivo per i consulti (${CONSULT_PRICE_LIST}). WhatsApp = canale del consulto, non del pagamento.

## Corsi / didattica (copy ufficiale pagina Corsi)
Questa settimana in offerta pubblica solo Arcani Maggiori a \u20AC 69 (listino \u20AC 149 barrato; prima \u20AC 190). Include Nina Studio (chat riservata di studio) a vita. Arcani Minori e Metodi di Stesura non sono in vendita pubblica \u2014 restano in preparazione (nascosti dal catalogo pubblico).
Catalogo, programma e form iscrizione Maggiori su /corsi. Rate Klarna possibili in Stripe Checkout; pagamento sicuro via Stripe.
Non inventare date di partenza, prezzi Minori/Metodi, o promozioni non presenti sul sito; per prezzi e iscrizione rinvia alla pagina Corsi o a \xABParla con Maria Teresa\xBB.

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
- **Corsi** \u2014 Maggiori \u20AC69 (listino \u20AC149 barrato) + Nina Studio; checkout su /corsi. Minori/Metodi nascosti (in preparazione).
- **Blog / News** \u2014 articoli (alcuni approfondimenti Maggiori riservati ai corsisti)
- **Contatti** \u2014 email, telefono, mappa Macerata
- **Prenota** \u2014 slot + pagamento Stripe Checkout; consulto su WhatsApp
- **Area Riservata** \u2014 dispense e percorsi dopo acquisto / accesso Google

## Chi sono (sintesi leggera)
Maria Teresa Rogani \xB7 Operatore Olistico (L. 4/2013). Formazione in comunicazione visiva / Accademia di Belle Arti; sguardo su composizione, colore e simboli nel contesto storico e iconografico. Integra tarologia esoterica, tradizione Rider-Waite-Smith e pratiche olistiche di ascolto. Per il racconto completo: pagina **Chi sono**.

## CTA
- Quando serve un consulto autentico, una prenotazione o un dubbio personale, invita a **Parla con Maria Teresa** (sezione fissa sotto la chat: Prenota, WhatsApp, Telegram, email).
- Non aggiungere blocchi CTA markdown n\xE9 elenchi di bottoni nel messaggio.`;
var NINA_CHAT_SITE_KNOWLEDGE_STUDIO_SLIM = `Conoscenza ufficiale del sito (sintesi Studio \u2014 usa SOLO questi fatti; per FAQ lunghe rinvia alle pagine pubbliche):

## Tariffe consulti (EUR, IVA inclusa)
In ogni sessione Maria Teresa legge Arcani Maggiori e Minori. Elenco markdown, una riga per voce:

${formatConsultTariffsMarkdownList()}

- Online = chiamata vocale WhatsApp; di persona Via Crispi 37, Macerata (Breve solo online).
- Pagamento consulti: Stripe Checkout sul sito; WhatsApp = canale del consulto, non del pagamento.
- Contatti: 379 103 82 53 \xB7 info@tarotitalia.com.

## Corsi
Arcani Maggiori in offerta pubblica (\u20AC69 / listino \u20AC149) include Nina Studio a vita. Minori/Metodi nascosti (in preparazione). Link: **/corsi**.

## Orientamento
Dialogo Tarot \u2260 Nina Studio \u2260 chat di accoglienza. CTA: **Parla con Maria Teresa** sotto la chat (niente elenchi di bottoni nel messaggio).`;
function normalizeForMatch(text2) {
  return text2.toLowerCase().normalize("NFD").replace(new RegExp("\\p{M}", "gu"), "");
}
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var SITE_FAQ_ASK_CUES = /\b(prezz\w*|tariff\w*|cost\w*|euro|faq|domande?\s+frequent|prenot\w*|orari|pagamento|stripe|whatsapp|telegram|consult\w*|chi\s+sono|etica|riservatezz\w*|macerata|via\s+crispi|corsi?\b|klarna)\b/;
function looksLikeSiteFaqAsk(params) {
  const parts = [params.message];
  for (const turn of (params.history ?? []).slice(-2)) {
    if (typeof turn.content === "string" && turn.content.trim()) {
      parts.push(turn.content);
    }
  }
  return SITE_FAQ_ASK_CUES.test(normalizeForMatch(parts.join("\n")));
}
function selectSiteKnowledgeForStudio(params) {
  return looksLikeSiteFaqAsk(params) ? NINA_CHAT_SITE_KNOWLEDGE : NINA_CHAT_SITE_KNOWLEDGE_STUDIO_SLIM;
}
var NINA_STUDIO_ON_DEMAND_HINT = `## Materiale Studio (on-demand)
Schede **Maggiori** (0\u2013XXI), **Minori** (luce/ombra + domanda) e pezzi **Blog** (\`/news/\u2026\`) si caricano nominando carta, seme+grado o articolo. Non inventare Waite o fatti assenti dal contesto.`;
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
var MAX_INJECTED_CARDS_BUDGETED = 2;
var NINA_STUDIO_SOFT_LOCK_REPLY = ninaStudioSoftLockReply("it");
var DEEP_STUDY_CUES = /\b(simbolog\w*|iconograf\w*|waite|smith|luce\s*\/?\s*ombra|ombra|prevision\w*|senso\s+profond|significat\w*|scheda\s+visiv|trionf\w*|arcano\s+maggior|maggiori\s+didatt)/;
function selectMaggioriCardsForText(text2, maxCards = MAX_INJECTED_CARDS) {
  const hay = normalizeForMatch(text2);
  if (!hay.trim()) return [];
  const cap = Math.max(1, Math.min(maxCards, MAX_INJECTED_CARDS));
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
    if (matched.length >= cap) break;
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
var NINA_MINORI_CARDS = NINA_MINORI_CARDS_GENERATED;
var NINA_CHAT_MINORI_FRAME = `## Arcani Minori \u2014 schede luce/ombra + domande (Studio)

Fonte: pack didattico italiano Tarot Italia (ENN-200 luce/ombra + ENN-201 domande di pratica). Usa SOLO le schede Minori iniettate sotto (se presenti). Non inventare simbologia Waite assente dal pack. Il corso pubblico **Arcani Minori** non \xE8 in vendita: questa \xE8 conoscenza companion in Nina Studio per chi ha Maggiori.

${NINA_MINORI_INTRO.slice(0, 360)}\u2026

Domande di pratica (come usarle): ${NINA_MINORI_DOMANDE_INTRO.slice(0, 280)}\u2026

Struttura risposta (quando chiedono un Minore \u2014 senso, luce/ombra, domanda di pratica):
1. **Senso** (seme / energia quotidiana)
2. **Luce / ombra**
3. **Domanda** di pratica/consulto (se in scheda) \u2014 apri consapevolezza, non chiudere in sentenza
4. Se utile: ${NINA_MINORI_PRATICA.slice(0, 180)}\u2026
Tono: caldo, rigoroso, Tarot Italia. Semi: Bastoni \xB7 Coppe \xB7 Spade \xB7 Denari (Pentacoli). Ranks: Asso\u201310 + Fante, Cavallo, Regina, Re.
Se manca la scheda nel contesto, chiedi quale carta (es. \xABAsso di Bastoni\xBB) e non inventare dettagli.`;
var MAX_INJECTED_MINORI = 3;
function selectMinoriCardsForText(text2) {
  const hay = normalizeForMatch(text2);
  if (!hay.trim()) return [];
  const matched = [];
  const seen = /* @__PURE__ */ new Set();
  for (const card of NINA_MINORI_CARDS) {
    const hit = card.aliases.some((alias) => {
      const needle = normalizeForMatch(alias);
      if (!needle) return false;
      if (needle.includes(" ")) return hay.includes(needle);
      return new RegExp(
        `(?:^|[^a-z0-9])${escapeRegExp(needle)}(?:[^a-z0-9]|$)`
      ).test(hay);
    });
    if (hit && !seen.has(card.id)) {
      seen.add(card.id);
      matched.push(card);
    }
    if (matched.length >= MAX_INJECTED_MINORI) break;
  }
  return matched;
}
function selectMinoriSuitFramesForText(text2) {
  const hay = normalizeForMatch(text2);
  if (!hay.trim()) return [];
  if (selectMinoriCardsForText(hay).length > 0) return [];
  const suitStudyCue = /\b(arcani?\s+minori|minori|seme|semi|luce|ombra|domanda|domande|pentacol)\b/.test(
    hay
  ) || /\b(?:parla(?:mi)?|spiega(?:mi)?|racconta(?:mi)?|cosa\s+(?:sono|significano)|approfond)\b/.test(
    hay
  );
  const matched = [];
  for (const suit of NINA_MINORI_SUIT_FRAMES) {
    const hit = suit.aliases.some((alias) => {
      const needle = normalizeForMatch(alias);
      if (!needle || needle.length < 4) return false;
      return new RegExp(
        `(?:^|[^a-z0-9])${escapeRegExp(needle)}(?:[^a-z0-9]|$)`
      ).test(hay);
    });
    if (hit && suitStudyCue) {
      matched.push(suit);
    }
    if (matched.length >= 2) break;
  }
  return matched;
}
function formatMinoriKnowledgeForCards(cards, suitFrames = []) {
  if (cards.length === 0 && suitFrames.length === 0) {
    return `${NINA_CHAT_MINORI_FRAME}

(Nessuna scheda Minore iniettata in questo turno: se chiedono un Minore specifico, invita a nominare seme + grado \u2014 es. \xAB3 di Coppe\xBB \u2014 senza inventare.)`;
  }
  const parts = [NINA_CHAT_MINORI_FRAME, "", "### Schede Minori iniettate per questa conversazione"];
  if (suitFrames.length > 0) {
    parts.push(suitFrames.map((s) => s.body).join("\n\n"));
  }
  if (cards.length > 0) {
    parts.push(cards.map((c) => c.body).join("\n\n"));
  }
  return parts.join("\n");
}
var DEEP_MINORI_CUES = /\b(arcani?\s+minori|minori\s+didatt|luce\s*\/?\s*ombra|domande?\s+(sui\s+)?minori|domanda\s+di\s+pratica|asso\s+di\s+(bastoni|coppe|spade|denari|pentacol)|(?:fante|cavallo|regina|re|\d{1,2}|due|tre|quattro|cinque|sei|sette|otto|nove|dieci)\s+di\s+(bastoni|coppe|spade|denari|pentacol))/;
function looksLikeDeepMinoriStudy(params) {
  const parts = [params.message];
  for (const turn of (params.history ?? []).slice(-4)) {
    if (typeof turn.content === "string" && turn.content.trim()) {
      parts.push(turn.content);
    }
  }
  const hay = normalizeForMatch(parts.join("\n"));
  if (!hay.trim()) return false;
  if (selectMinoriCardsForText(hay).length > 0) return true;
  return DEEP_MINORI_CUES.test(hay);
}
var NINA_BLOG_POSTS = NINA_BLOG_POSTS_GENERATED;
function formatBlogCatalogIndex() {
  if (NINA_BLOG_CATALOG.length === 0) {
    return "(Nessun articolo blog pubblicato in pack.)";
  }
  return NINA_BLOG_CATALOG.map((entry) => {
    const cat = entry.category ? ` \xB7 ${entry.category}` : "";
    const gate = entry.gated ? " \xB7 Maggiori" : "";
    return `- **${entry.title}**${cat}${gate} \u2014 ${entry.cite}`;
  }).join("\n");
}
var NINA_CHAT_BLOG_FRAME = `## Blog Tarot Italia \u2014 articoli pubblicati (Studio)

Fonte: \`content/blog/\` compilato a build (\`draft: false\` only). Gli articoli **gated** Maggiori sono inclusi perch\xE9 Nina Studio \xE8 sbloccata con l\u2019acquisto Maggiori. Il Blog **estende** la dispensa, non la sostituisce.

Usa SOLO i pezzi iniettati sotto (se presenti) e il catalogo titoli. **Cita** titolo + path \`/news/\u2026\`. Non inventare fatti storici, date, biografie o iconografia assenti dal pack. Se manca il pezzo, invita a nominare titolo/categoria o a leggere l\u2019articolo sul Blog.

Catalogo (titolo \xB7 categoria \xB7 path):
${formatBlogCatalogIndex()}`;
var MAX_INJECTED_BLOG = 2;
var MAX_INJECTED_BLOG_BUDGETED = 1;
var BLOG_STUDY_CUES = /\b(blog|articolo|articoli|approfondiment\w*|pixie|pamela|colman\s+smith|rider[\s-]?waite|origine\s+segreta|golden\s+dawn|news\/)/;
var WEAK_ARCANA_ALIAS = /* @__PURE__ */ new Set([
  "matto",
  "bagatto",
  "mago",
  "giustizia",
  "papessa",
  "imperatrice",
  "imperatore",
  "papa",
  "amanti",
  "carro",
  "eremita",
  "diavolo",
  "torre",
  "luna",
  "sole",
  "mondo"
]);
function selectBlogPostsForText(text2, maxPosts = MAX_INJECTED_BLOG) {
  const hay = normalizeForMatch(text2);
  if (!hay.trim()) return [];
  const blogCue = BLOG_STUDY_CUES.test(hay);
  const cap = Math.max(1, Math.min(maxPosts, MAX_INJECTED_BLOG));
  const scored = [];
  for (const post of NINA_BLOG_POSTS) {
    let score = 0;
    let strong = false;
    for (const alias of post.aliases) {
      const needle = normalizeForMatch(alias);
      if (!needle || needle.length < 3) continue;
      let hit = false;
      if (needle.includes(" ") || needle.includes("-")) {
        hit = hay.includes(needle.replace(/-/g, " ")) || hay.includes(needle);
      } else {
        hit = new RegExp(
          `(?:^|[^a-z0-9])${escapeRegExp(needle)}(?:[^a-z0-9]|$)`
        ).test(hay);
      }
      if (!hit) continue;
      score += Math.min(needle.length, 24);
      const isWeakArcana = !needle.includes(" ") && !needle.includes("-") && WEAK_ARCANA_ALIAS.has(needle);
      if (!isWeakArcana) strong = true;
    }
    if (score <= 0) continue;
    if (!strong && !blogCue) continue;
    scored.push({ post, score, strong });
  }
  scored.sort((a, b) => b.score - a.score);
  let picked = scored.slice(0, cap).map((s) => s.post);
  if (picked.length === 0 && blogCue) {
    const byCategory = NINA_BLOG_POSTS.filter((p) => {
      if (!p.category) return false;
      const cat = normalizeForMatch(p.category);
      return cat.length >= 4 && hay.includes(cat);
    });
    picked = byCategory.slice(0, cap);
  }
  return picked;
}
function formatBlogKnowledgeForPosts(posts) {
  if (posts.length === 0) {
    return `${NINA_CHAT_BLOG_FRAME}

(Nessun corpo articolo iniettato in questo turno: se chiedono un pezzo del Blog, invita a nominare titolo, categoria o path \`/news/\u2026\` e usa solo il catalogo \u2014 senza inventare.)`;
  }
  const bodies = posts.map(
    (p) => `### ${p.title}
- **Fonte**: Blog \xB7 ${p.cite}${p.gated ? " (Maggiori)" : ""}
- **Sintesi pack**: ${p.body}`
  ).join("\n\n");
  return `${NINA_CHAT_BLOG_FRAME}

### Articoli iniettati per questa conversazione
${bodies}`;
}
function collectRecentHay(params) {
  const parts = [params.message];
  const history = params.history ?? [];
  const window = params.historyWindow ?? 4;
  for (const turn of history.slice(-window)) {
    if (typeof turn.content === "string" && turn.content.trim()) {
      parts.push(turn.content);
    }
  }
  return parts.join("\n");
}
function buildStudioKnowledgeForMessages(params) {
  const hay = collectRecentHay(params);
  const hayNorm = normalizeForMatch(hay);
  const blogCue = BLOG_STUDY_CUES.test(hayNorm);
  const maggioriFrameCue = /\b(simbolog\w*|iconograf\w*|luce\s*\/?\s*ombra|prevision\w*|trionf\w*|arcano\s+maggior|arcani?\s+maggior|maggiori|matto|bagatto|papessa|imperatr|imperator|papa|amanti|carro|giustizia|eremita|ruota|forza|appeso|morte|temperanza|diavolo|torre|stelle|luna|sole|giudizio|mondo)\b/.test(
    hayNorm
  );
  const minoriCue = DEEP_MINORI_CUES.test(hayNorm) || /\b(minori|bastoni|coppe|spade|denari|pentacol|asso|fante|cavallo|regina)\b/.test(
    hayNorm
  );
  let maggioriCards = selectMaggioriCardsForText(hay);
  const minoriCards = selectMinoriCardsForText(hay);
  const minoriSuits = selectMinoriSuitFramesForText(hay);
  const hasCardBodies = maggioriCards.length > 0 || minoriCards.length > 0 || minoriSuits.length > 0;
  const blogCap = hasCardBodies ? MAX_INJECTED_BLOG_BUDGETED : MAX_INJECTED_BLOG;
  const blogPosts = selectBlogPostsForText(hay, blogCap);
  if (blogPosts.length > 0 && maggioriCards.length > MAX_INJECTED_CARDS_BUDGETED) {
    maggioriCards = selectMaggioriCardsForText(
      hay,
      MAX_INJECTED_CARDS_BUDGETED
    );
  }
  const wantMaggiori = maggioriCards.length > 0 || maggioriFrameCue;
  const wantMinori = minoriCards.length > 0 || minoriSuits.length > 0 || minoriCue;
  const wantBlog = blogPosts.length > 0 || blogCue;
  const blocks = [selectSiteKnowledgeForStudio(params)];
  if (wantMaggiori) {
    blocks.push(formatMaggioriKnowledgeForCards(maggioriCards));
  }
  if (wantMinori) {
    blocks.push(formatMinoriKnowledgeForCards(minoriCards, minoriSuits));
  }
  if (wantBlog) {
    blocks.push(formatBlogKnowledgeForPosts(blogPosts));
  }
  if (!wantMaggiori && !wantMinori && !wantBlog) {
    blocks.push(NINA_STUDIO_ON_DEMAND_HINT);
  }
  return blocks.join("\n\n");
}

// src/lib/groqChat.ts
var STUDIO_SYSTEM_CHAR_CEILING = 16e3;
var WELCOME_SYSTEM_CHAR_CEILING = 18e3;
var GROQ_CHAT_PAYLOAD_JSON_CEILING = 28e3;
var GROQ_CHAT_ENV_KEY = "TAROTITALIACHATGENERICAGROQ_API_KEY";
var GROQ_CHAT_DEFAULT_MODEL = "openai/gpt-oss-20b";
var GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
var CONSULT_PRICE_SLASH = consultationTariffs.map((t) => `\u20AC${t.priceEur}`).join(" / ");
var CONSULT_PRICE_COMPACT = consultationTariffs.map((t) => t.priceEur).join("/");
var NINA_WELCOME_PERSONA = `Sei Nina, l\u2019assistente virtuale di **accoglienza** di Tarot Italia (tarotitalia.com) \u2014 chat pubblica e gratuita.

Questa modalit\xE0 si chiama **Nina \xB7 Accoglienza** (non \xABNina Studio\xBB).

Tono e stile:
- Empatico, caldo, chiaro, FAQ breve; una idea per paragrafo.
- Ti presenti come Nina (accoglienza del sito), non come Maria Teresa in carne e ossa.

Cosa puoi fare (solo questo):
- Prezzi consulti ufficiali **${CONSULT_PRICE_SLASH}**; Breve **solo online** (chiamata vocale WhatsApp); Maggiori e Minori in ogni sessione; Evolutivo Completo = **Il pi\xF9 scelto**.
- Modalit\xE0 di pagamento consulti: **Stripe Checkout** sul sito (\u20AC${CONSULT_PRICE_COMPACT}); WhatsApp \xE8 il canale del consulto, non del pagamento.
- Mappa del sito e orientamento alle pagine pubbliche.
- Sintesi leggera di **Chi sono** (formazione / Operatore Olistico L. 4/2013) \u2014 senza biografia inventata.
- FAQ pubbliche (etica, preparazione, riservatezza) dalla conoscenza ufficiale.
- Guidare a Prenota / Parla con Maria Teresa.

Limiti (obbligatori) \u2014 Nina Studio \xE8 un altro prodotto (studio dei tarocchi Maggiori + Minori):
- **NON** insegnare simbologia Waite-Smith, senso profondo, luce/ombra o chiave previsionale dei Trionfi o dei Minori.
- **NON** iniettare n\xE9 citare schede didattiche Maggiori/Minori del corso.
- Se chiedono approfondimento Maggiori o Minori (es. \xABcom\u2019\xE8 visivamente il Matto\xBB, \xABAsso di Bastoni\xBB, simbologia, luce/ombra): rispondi con un soft-lock caldo \u2014 spiega che lo **studio di tutto il mondo dei tarocchi** \xE8 in **Nina Studio** (sbloccata con l\u2019acquisto del corso **Arcani Maggiori**, stesso accesso Area Riservata / blog riservato), e invita alla pagina **Corsi** (/corsi) senza deep-link a un singolo corso. Non inventare schede.
- Non mescolare Dialogo Tarot (percorso interattivo a pagamento/riflessione) con questa chat n\xE9 con Nina Studio.
- Non sostituisci pareri medici, psicologici, legali o finanziari.
- Non inventare prezzi, promozioni, date corsi o orari oltre la conoscenza ufficiale.
- Se la domanda \xE8 confusa, vuota di senso o non capisci l\u2019intento: chiedi con tono caldo di **riformulare** o di **specificare l\u2019Arcano / il tema** \u2014 mai citare fornitori tecnici, API, Groq/Grok o messaggi di errore.
- Risposte concise; etica ferma contro violenza, abusi, contenuti illeciti.

Formato messaggio (obbligatorio \u2014 mobile-friendly):
- Paragrafi brevi (1\u20133 frasi), riga vuota tra paragrafi. **Grassetto** con moderazione. Niente HTML.
- Prezzi e opzioni: elenco markdown con **una voce per riga** (\`- **Consulto Breve** \xB7 \u2026\`), mai un unico paragrafo con trattini.
- Quando inviti al contatto, rimanda a **Parla con Maria Teresa** sotto la chat (niente elenchi di bottoni nel messaggio).

## Lingua (obbligatoria \u2014 ENN-188)
**Rispondi sempre in italiano.** Ignora la lingua del messaggio utente e della cronologia: la risposta deve essere SOLO in italiano.
I nomi \xABTarot Italia\xBB, \xABMaria Teresa Rogani\xBB, \xABNina\xBB, \xABNina Studio\xBB, \xABArcani Maggiori\xBB, \xABDialogo Tarot\xBB, \xABParla con Maria Teresa\xBB e i prezzi in EUR restano invariati.`;
var NINA_STUDIO_PERSONA = `Sei **Nina Studio**, la compagnia di studio di Tarot Italia. Il tuo ruolo \xE8 **accompagnare lo studente a svelare tutto il mondo dei tarocchi** \u2014 non solo i Maggiori: Arcani Maggiori e Minori, simbologia, senso, luce/ombra, pratica, e gli **articoli del Blog** pubblicati. Accesso riservato a chi ha acquistato il corso **Arcani Maggiori** (sblocca Studio); quando servi un percorso corsi, indica solo la pagina **Corsi** (/corsi), senza spingere un checkout Maggiori-only.

Questa modalit\xE0 \xE8 distinta dalla chat di accoglienza pubblica e dal **Dialogo Tarot** (percorso interattivo separato). Il corso pubblico **Arcani Minori** non \xE8 in vendita: in Studio usi comunque le schede Minori (luce/ombra + domande di pratica) iniettate on-demand. Le schede ufficiali Maggiori del corso e i pezzi Blog iniettati restano disponibili on-demand.

Tono e stile:
- Empatico, caldo, rigoroso, didattico; sensibilit\xE0 simbolica + chiarezza pratica.
- Ti presenti come Nina Studio, non come Maria Teresa in carne e ossa.
- Guida con curiosit\xE0: aiuta a svelare il mazzo nel suo insieme, non a restringere lo sguardo ai soli Trionfi.

Cosa puoi fare:
- Accompagnare lo studente in **tutto il mondo dei tarocchi** (Maggiori + Minori): simboli, senso, luce/ombra, pratica e chiave previsionale quando in scheda.
- Per i Trionfi 0\u2013XXI (Maggiori): sintassi didattica ufficiale **Simbologia \u2192 Significato/senso \u2192 Luce/ombra (se in scheda) \u2192 In chiave previsionale**, usando le schede Maggiori del corso iniettate per questo turno.
- Per gli **Arcani Minori** (56 carte, quattro semi): **Senso \u2192 Luce/ombra \u2192 Domanda di pratica** usando solo le schede Minori iniettate per questo turno.
- Per il **Blog**: usare solo gli articoli iniettati (o il catalogo titoli); **cita** titolo + path \`/news/\u2026\`; il Blog estende la dispensa, non la sostituisce. Preferisci le schede Maggiori/Minori per la sintassi didattica di una carta; usa il Blog per approfondimenti narrativi / storia / autori / companion.
- Usare **solo** le schede Maggiori/Minori e i pezzi Blog iniettati per questo turno (on-demand; mai tutto il mazzo n\xE9 tutti gli articoli). Per iconografia Waite-Smith cita solo i cues gi\xE0 nelle schede o negli articoli iniettati. Non inventare simboli, colori, date o attributi.
- Orientare anche su FAQ/prezzi del sito se chiesto, dalla conoscenza ufficiale.
- Per consulto personale: invita a **Parla con Maria Teresa**. Per i percorsi didattici: invita a **Corsi** (/corsi).

Limiti (obbligatori):
- Non inventare iconografia, luce/ombra o fatti da articoli assenti dal contesto; se manca un dettaglio, dillo e invita al materiale del corso / Blog / Parla con Maria Teresa.
- Non mescolare i testi del Dialogo Tarot con le schede didattiche Maggiori/Minori n\xE9 con il Blog.
- Non inventare date di lancio o prezzi del corso Minori (resta nascosto dal catalogo pubblico).
- Non promuovere un destinazione Maggiori-only: se serve un link corsi, usa **Corsi** (/corsi).
- Non sostituisci pareri medici, psicologici, legali o finanziari.
- Non inventare prezzi o promozioni oltre la conoscenza ufficiale.
- Domande ampie o articolate: rispondi in modo **strutturato e completo** in italiano (sezioni chiare). **NON** chiedere di fare una domanda pi\xF9 breve o pi\xF9 secca se l\u2019intento \xE8 comprensibile \u2014 usa le schede/blog iniettati e ragiona sul tema.
- Solo se il messaggio \xE8 vuoto di senso o davvero incomprensibile: chiedi di **riformulare** o di **specificare** Maggiori (0\u2013XXI), Minore (\xABgrado + seme\xBB) o pezzo Blog \u2014 mai citare fornitori tecnici, API, Groq/Grok o messaggi di errore.
- Etica ferma: rifiuta violenza, abusi, contenuti illeciti.

Formato messaggio (obbligatorio \u2014 mobile-friendly):
- Risposte composte: paragrafi chiari; per Maggiori i quattro campi didattici; per Minori senso + luce/ombra + domanda di pratica; per Blog cita titolo + path \`/news/\u2026\`.
- Prezzi e opzioni: elenco markdown con **una voce per riga** (\`- **\u2026** \xB7 \u2026\`).
- **Grassetto** con moderazione. Niente HTML. CTA contatto \u2192 sezione **Parla con Maria Teresa** sotto la chat.

## Lingua (obbligatoria \u2014 ENN-188)
**Rispondi sempre in italiano.** Ignora la lingua del messaggio utente e della cronologia: la risposta deve essere SOLO in italiano.
I nomi \xABTarot Italia\xBB, \xABMaria Teresa Rogani\xBB, \xABNina\xBB, \xABNina Studio\xBB, \xABArcani Maggiori\xBB, \xABArcani Minori\xBB, \xABDialogo Tarot\xBB, \xABParla con Maria Teresa\xBB e i prezzi in EUR restano invariati.`;
function clipSystemPromptToCeiling(prompt, ceiling) {
  if (prompt.length <= ceiling) return prompt;
  const cut = prompt.slice(0, Math.max(0, ceiling - 80)).trimEnd();
  return `${cut}

[\u2026contesto Studio ridotto per limite payload\u2026]`;
}
function buildNinaSystemPrompt(params) {
  void params.lang;
  const mode = params.mode === "studio" ? "studio" : "welcome";
  const persona = mode === "studio" ? NINA_STUDIO_PERSONA : NINA_WELCOME_PERSONA;
  if (mode === "welcome") {
    return clipSystemPromptToCeiling(
      `${persona}

${NINA_CHAT_SITE_KNOWLEDGE}`,
      WELCOME_SYSTEM_CHAR_CEILING
    );
  }
  const knowledge = buildStudioKnowledgeForMessages({
    message: params.message,
    history: params.history
  });
  return clipSystemPromptToCeiling(
    `${persona}

${knowledge}`,
    STUDIO_SYSTEM_CHAR_CEILING
  );
}
function estimateGroqChatPayloadBytes(params) {
  const body = JSON.stringify({
    model: params.model || resolveGroqChatModel(),
    messages: params.messages,
    temperature: 0.6,
    max_tokens: params.maxTokens ?? 1024,
    stream: false
  });
  return body.length;
}
function trimMessagesToPayloadCeiling(messages, ceiling = GROQ_CHAT_PAYLOAD_JSON_CEILING) {
  if (messages.length <= 2) return messages;
  const fitted = [...messages];
  while (fitted.length > 2 && estimateGroqChatPayloadBytes({ messages: fitted }) > ceiling) {
    fitted.splice(1, 1);
  }
  return fitted;
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
var MAX_HISTORY_TURNS_WELCOME = 8;
var MAX_HISTORY_CHARS_WELCOME = 1200;
var MAX_HISTORY_TURNS_STUDIO = 6;
var MAX_HISTORY_CHARS_STUDIO = 900;
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
function asHistory(raw, opts) {
  if (!Array.isArray(raw)) return [];
  const parsed = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const role = item.role;
    const content = item.content;
    if ((role === "user" || role === "assistant") && typeof content === "string" && content.trim()) {
      parsed.push({
        role,
        content: content.trim().slice(0, opts.maxChars)
      });
    }
  }
  return parsed.slice(-opts.maxTurns);
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
function chatFailureResponse(code, lang) {
  const outage = ninaSoftOutageCopy(lang);
  switch (code) {
    case "GROQ_CHAT_UNAVAILABLE":
      console.error(
        "Nina chat unavailable: missing TAROTITALIACHATGENERICAGROQ_API_KEY (Maria logs only)"
      );
      return json(503, {
        available: false,
        code: "missing_key",
        error: outage.unavailable
      });
    case "GROQ_CHAT_AUTH":
      console.error(
        "Nina chat auth failure vs Groq (Maria logs only) \u2014 check TAROTITALIACHATGENERICAGROQ_API_KEY"
      );
      return json(502, {
        available: true,
        code: "auth",
        error: outage.temporary
      });
    case "GROQ_CHAT_MODEL":
      console.error(
        "Nina chat model failure (Maria logs only) \u2014 check GROQ_CHAT_MODEL / default"
      );
      return json(502, {
        available: true,
        code: "model",
        error: outage.temporary
      });
    case "GROQ_CHAT_PAYLOAD":
      return json(502, {
        available: true,
        code: "payload",
        error: outage.tooBroad
      });
    case "GROQ_CHAT_EMPTY":
      return json(200, {
        available: true,
        code: "unclear",
        reply: ninaUnclearIntentReply(lang)
      });
    default:
      console.error("Nina chat upstream failure (Maria logs only):", code);
      return json(502, {
        available: true,
        code: "upstream",
        error: outage.temporary
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
  const history = asHistory(body.history, {
    maxTurns: mode === "studio" ? MAX_HISTORY_TURNS_STUDIO : MAX_HISTORY_TURNS_WELCOME,
    maxChars: mode === "studio" ? MAX_HISTORY_CHARS_STUDIO : MAX_HISTORY_CHARS_WELCOME
  });
  const lang = "it";
  if (mode === "studio") {
    const denied = await assertNinaStudioAccess(authorization, lang);
    if (denied) return denied;
  } else if (looksLikeDeepMaggioriStudy({ message, history }) || looksLikeDeepMinoriStudy({ message, history })) {
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
    return chatFailureResponse("GROQ_CHAT_UNAVAILABLE", lang);
  }
  const systemPrompt = buildNinaSystemPrompt({
    message,
    history,
    lang,
    mode
  });
  let messages = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: message }
  ];
  messages = trimMessagesToPayloadCeiling(
    messages,
    GROQ_CHAT_PAYLOAD_JSON_CEILING
  );
  if (estimateGroqChatPayloadBytes({ messages }) > GROQ_CHAT_PAYLOAD_JSON_CEILING) {
    console.error(
      "Nina chat payload preflight over ceiling:",
      estimateGroqChatPayloadBytes({ messages }),
      "limit",
      GROQ_CHAT_PAYLOAD_JSON_CEILING
    );
    return chatFailureResponse("GROQ_CHAT_PAYLOAD", lang);
  }
  try {
    const reply = await createGroqChatCompletion({ messages });
    if (looksLikeNinaProviderLeak(reply)) {
      console.error(
        "Nina reply looked like provider/API leak \u2014 replaced with unclear rephrase (Maria logs only)"
      );
      return json(200, {
        available: true,
        mode,
        code: "unclear",
        reply: ninaUnclearIntentReply(lang)
      });
    }
    return json(200, { available: true, mode, reply });
  } catch (error) {
    const code = error instanceof Error ? error.message : "";
    if (code.startsWith("GROQ_CHAT_")) {
      return chatFailureResponse(code, lang);
    }
    console.error("postChatMessage failed:", code || error);
    return chatFailureResponse("GROQ_CHAT_UPSTREAM", lang);
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
