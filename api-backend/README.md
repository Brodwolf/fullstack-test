# Backend

## Autenticação JWT

---

## User Endpoints

### 1. Criar Usuário

**URL:** POST (...)/api/users/

**body:**

```json
{
  "nome": string
  "cpf": string
}
```

**return:**

```json
{
  "id": number,
  "nome": string,
  "cpf": string
}
```

### 2. Listar Usuários

**URL:** POST (...)/api/users/

**return:**

```json
[
  {
    "id": number,
    "nome": string,
    "cpf": string
  }
]
```

### 3. Atualizar Usuário

**URL:** PUT (...)/api/users/**userId**

**body:**

```json
{
  "nome": string
  "cpf": string
}
```

**return:**

```json
{
  "id": number,
  "nome": string,
  "cpf": string
}
```

### 4. Deletar Usuário

**URL:** DELETE (...)/api/users/**userId**

**return:**

```json
  HTTP: 200
```

### 5. Buscar Usuário por id

**URL:** GET (...)/api/users/**userId**

**return:**

```json
{
  "id": number,
  "nome": string,
  "cpf": string
}
```

---

## Contact Endpoints

### 1. Criar Contato

**URL:** POST (...)/api/contacts

**body:**

```json
{
  "tipo": EnumContactType => EMAIL | TELEFONE
  "descricao": string
}
```

**return:**

```json
{
  "id": number,
  "tipo": EnumContactType => EMAIL | TELEFONE,
  "descricao": string
}
```

### 2. Listar Contatos

**URL:** POST (...)/api/contacts

**return:**

```json
[
  {
    "id": number,
    "tipo": EnumContactType => EMAIL | TELEFONE,
    "descricao": string
  }
]
```

### 3. Atualizar Contato

**URL:** PUT (...)/api/contacts/**contactId**

**body:**

```json
{
  "id": number,
  "tipo": EnumContactType => EMAIL | TELEFONE,
  "descricao": string
}
```

**return:**

```json
{
  "id": number,
  "tipo": EnumContactType => EMAIL | TELEFONE,
  "descricao": string
}
```

### 4. Deletar Contato

**URL:** DELETE (...)/api/contacts/**contactId**

**return:**

```json
  HTTP: 200
```

### 5. Buscar contatos do usuário

**URL:** GET (...)/api/user/**userId**/contacts

**return:**

```json
[
  {
    "id": number,
    "tipo": EnumContactType => EMAIL | TELEFONE,
    "descricao": string
  }
]
```
