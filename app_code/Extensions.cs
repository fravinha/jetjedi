/*
    MIT License

    Copyright(c) 2017 Felipe A.M.Ferreira

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
            https://github.com/felipeamferreira/SQLMinimal
*/

public static class Int {
    public static bool Between(this int value, int firstValue, int secondValue) {
        if (firstValue > secondValue) {
            int tempValue = firstValue;
            firstValue = secondValue;
            secondValue = tempValue;
        }

        return value >= firstValue && value <= secondValue;
    }

    public static bool In(this int value, params int[] values) {
        foreach (int r in values) {
            if (value == r) {
                return true;
            }
        }
        return false;
    }
}

public static class Decimal {
    public static bool Between(this decimal value, decimal firstValue, decimal secondValue) {
        if (firstValue > secondValue) {
            decimal tempValue = firstValue;
            firstValue = secondValue;
            secondValue = tempValue;
        }

        return value >= firstValue && value <= secondValue;
    }

    public static bool In(this decimal value, params decimal[] values) {
        foreach (int r in values) {
            if (value == r) {
                return true;
            }
        }
        return false;
    }
}

public static class Double {
    public static bool Between(this double value, double firstValue, double secondValue) {
        if (firstValue > secondValue) {
            double tempValue = firstValue;
            firstValue = secondValue;
            secondValue = tempValue;
        }

        return value >= firstValue && value <= secondValue;
    }

    public static bool In(this double value, params double[] values) {
        foreach (int r in values) {
            if (value == r) {
                return true;
            }
        }
        return false;
    }
}

public static class String {
    public static bool In(this string value, params string[] values) {
        foreach (string v in values) {
            if (value == v) {
                return true;
            }
        }
        return false;
    }

    public static bool Like(this string value, string pattern) {
        if (string.IsNullOrEmpty(value) || string.IsNullOrEmpty(pattern)) {
            return false;
        }

        string[] patterns = pattern.Split('%');
        string tempPattern = patterns[0],
               worker = value;

        if (!worker.StartsWith(tempPattern)) {
            return false;
        }

        worker = worker.Substring(tempPattern.Length);

        if (patterns.Length > 1) {
            tempPattern = patterns[patterns.Length - 1];

            if (!worker.EndsWith(tempPattern)) {
                return false;
            }

            worker = worker.Substring(0, worker.Length - tempPattern.Length);

            for (int i = 1; i < patterns.Length - 1; i++) {
                tempPattern = patterns[i];

                if (worker.IndexOf(tempPattern) < 0) {
                    return false;
                }

                worker = worker.Substring(worker.IndexOf(tempPattern) + tempPattern.Length);
            }
        }

        return true;
    }

    public static string ToJavaScript(this string value) {
        string ret = "";

        if (value != null) {
            ret = value.Replace("\\", "\\\\")
                       .Replace("'", "\\'")
                       .Replace("\"", "\\\"");
        }

        return ret;
    }
}

public static class Object {
    public static object Convert(this object value, System.Type type) {
        if (type.IsGenericType) {
            return System.Convert.ChangeType(value, type.GetGenericArguments()[0]);
        }

        switch (type.Name) {
            case "String": return value.ToString();
            case "Boolean": return System.Convert.ToBoolean(value);
        }

        return value;
    }
}
