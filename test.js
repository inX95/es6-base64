describe("Base64", () => {
  let base64;
  
  beforeEach(() => {
    base64 = new Base64();
  });
  
  it("encodes a string correctly", () => {
    const str = "test";
    const encoded = base64.encode(str);
    expect(encoded).toBe("dGVzdA==");
  });
  
  it("decodes an encoded string correctly", () => {
    const encoded = "dGVzdA==";
    const decoded = base64.decode(encoded);
    expect(decoded).toBe("test");
  });
  
  it("returns an empty string for an empty input", () => {
    const encoded = base64.encode("");
    expect(encoded).toBe("");
  });
  
  it("handles non-multiple-of-3 length strings correctly", () => {
    const str = "tes";
    const encoded = base64.encode(str);
    expect(encoded).toBe("dGVz");
  });
});

