### API documentation

========================================
#### Create collection
<pre>
api: /api/collection/new
type: post
header: required
body:
{ 
    name: String, 
    cover: String, 
    shopId: String 
}
return:
{
    "collection": {
        "members": 1,
        "public": false,
        "_id": "5f09f6087961400e00e19ea0",
        "name": "Collections name",
        "cover": "image url",
        "shopId": "5f09f6087961400e00e19e9f",
        "__v": 0
    },
    "member": {
        "state": "verified",
        "role": "author",
        "_id": "5f09f60a7961400e00e19ea1",
        "collectionId": "5f09f6087961400e00e19ea0",
        "member": "5f08baf0fc29ea064202b0e0",
        "__v": 0
    }
}
</pre>

#### Get my collections
<pre>
api: /api/collection/mine
type: get
header: required
body: null
return:
[
    {
        "state": "verified",
        "role": "member",
        "_id": "5f09a0c91d94cf09431fbe3a",
        "collectionId": {
            "members": 0,
            "public": false,
            "_id": "5f09a0c81d94cf09431fbe39",
            "name": "Collections name",
            "cover": "image url",
            "__v": 0
        },
        "member": "5f08baf0fc29ea064202b0e0",
        "__v": 0
    },
    {
        "state": "verified",
        "role": "author",
        "_id": "5f09f60a7961400e00e19ea1",
        "collectionId": {
            "members": 1,
            "public": false,
            "_id": "5f09f6087961400e00e19ea0",
            "name": "Collections name",
            "cover": "image url",
            "shopId": "5f09f6087961400e00e19e9f",
            "__v": 0
        },
        "member": "5f08baf0fc29ea064202b0e0",
        "__v": 0
    }
]
</pre>


#### Add members
<pre>
api: /api/collection/:id/members/add
type: post
header: required
body: {
    members: [userId]
}
return:
[
    {
        "state": "pending",
        "role": "member",
        "_id": "5f09f60a7961400e00e19ea1",
        "collectionId": "5f09f6087961400e00e19ea0",
        "member": "5f08baf0fc29ea064202b0e0",
        "__v": 0
    }
]
</pre>



#### Respond to the request
<pre>
api: /api/collection/:id/members/respond
type: put
header: required
query: {
    response: verified or blocked
}
return:
{
        "state": ${your response},
        "role": "member",
        "_id": "5f09f60a7961400e00e19ea1",
        "collectionId": "5f09f6087961400e00e19ea0",
        "member": "5f08baf0fc29ea064202b0e0",
        "__v": 0
}
</pre>



#### Search public collections
<pre>
api: /api/collection/public
type: get
header: required
query: 
{
    name: String
}
body: null
return:
[
    {
        "members": 1,
        "public": true,
        "_id": "5f09f6087961400e00e19ea0",
        "name": "Collections name",
        "cover": "image url",
        "shopId": "5f09f6087961400e00e19e9f",
        "__v": 0
    }
]
</pre>


#### Get public collections of a user
<pre>
api: /api/collection/public
type: get
query: 
{
    userId: String
}
body: null
return:
[
    {
        "state": "verified",
        "role": "author",
        "_id": "5f09f60a7961400e00e19ea1",
        "collectionId": {
            "members": 1,
            "public": true,
            "_id": "5f09f6087961400e00e19ea0",
            "name": "Collections name",
            "cover": "image url",
            "shopId": "5f09f6087961400e00e19e9f",
            "__v": 0
        },
        "member": "5f08baf0fc29ea064202b0e0",
        "__v": 0
    }
]
</pre>



#### Get collection by id
<pre>
api: /api/collection/:id
type: get
header: required
return:
{
    "members": 0,
    "public": false,
    "_id": "5f09a0c81d94cf09431fbe39",
    "name": "Collections name",
    "cover": "image url",
    "__v": 0,
    "shopId": Shop.model
}
</pre>


#### Update collection info
<pre>
api: /api/collection/:id
type: put
header: required
body: {
    name: String,
    cover: String,
    public: boolean
}
return:
{
    "members": 0,
    "public": false,
    "_id": "5f09a0c81d94cf09431fbe39",
    "name": "Collections name",
    "cover": "image url",
    "__v": 0
}
</pre>

#### Get collection members
<pre>
api: /api/collection/:id/members
type: get
header: required
return:
[
    {
        "state": "verified",
        "role": "member",
        "_id": "5f09a0c91d94cf09431fbe3a",
        "collectionId": "5f09a0c81d94cf09431fbe39",
        "member": "5f08baf0fc29ea064202b0e0",
        "__v": 0
    }
]
</pre>


#### Cancel invitation request
<pre>
api: /api/collection/:id/members/cancel
type: delete
header: required
query: {
    userId: String
}
return:
{
        "state": "verified",
        "role": "member",
        "_id": "5f09a0c91d94cf09431fbe3a",
        "collectionId": "5f09a0c81d94cf09431fbe39",
        "member": "5f08baf0fc29ea064202b0e0",
        "__v": 0
}
</pre>


#### Duplicate a collection
<pre>
api: /api/collection/:id/duplicate
type: post
header: required
body: {
    name: String, 
    cover: String, 
    shopId: String 
}
return:
{
    "collection": {
        "members": 1,
        "public": false,
        "_id": "5f0aefbafaf84903aad9e92f",
        "name": "new collection",
        "cover": "background",
        "shopId": "5f0aefbafaf84903aad9e92e",
        "__v": 0
    },
    "member": {
        "state": "verified",
        "role": "author",
        "_id": "5f0aefc0faf84903aad9e930",
        "collectionId": "5f0aefbafaf84903aad9e92f",
        "member": "5f08baf0fc29ea064202b0e0",
        "__v": 0
    },
    "newProducts": []
}
</pre>


#### Leave a collection
<pre>
api: /api/collection/:id/members/leave
type: delete
header: required
return:
{
    "state": "verified",
    "role": "member",
    "_id": "5f09a0c91d94cf09431fbe3a",
    "collectionId": "5f09a0c81d94cf09431fbe39",
    "member": "5f08baf0fc29ea064202b0e0",
    "__v": 0
}
</pre>
